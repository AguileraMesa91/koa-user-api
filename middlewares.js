// middlewares.js – Middlewares personalizados para la aplicación Koa
//
// Este módulo define y exporta middlewares reutilizables:
// - setFinalResponseMdw: registra método, ruta y tiempo de respuesta.
// - setResponseTimeMdw: mide y agrega el tiempo de respuesta al header
// - bodyParserMdw: interpreta el cuerpo de solicitudes HTTP con métodos que lo requieren
// - validateTokenMiddleware: verifica la validez de un token JWT en el header Authorization
// - errorCatcherMdw: captura errores no controlados y responde con código y mensaje apropiados

import { verifyToken } from './src/utils/tokenGenerator.js'

/**
 * Middleware para registrar método, URL y tiempo de respuesta de cada petición
 * Se ejecuta después de haber manejado la solicitud
 */
export async function setFinalResponseMdw (ctx, next) {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
}

/**
 * Middleware para calcular el tiempo que tarda una solicitud en procesarse
 * Agrega ese tiempo en milisegundos al header `X-Response-Time`
 */
export async function setResponseTimeMdw (ctx, next) {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
}

// Métodos HTTP que requieren parseo del cuerpo
const ALLOWED_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

// Convierte una cadena de consulta (query string) en un objeto JSON
const queryStringToJson = queryString =>
  Object.fromEntries(
    queryString.split('&').map(pair => pair.split('=').map(decodeURIComponent))
  )

/**
 * Middleware para interpretar el cuerpo de las solicitudes
 * Soporta JSON o datos tipo querystring en métodos que lo permiten
 * El resultado se almacena en `ctx.request.body`
 */
export function bodyParserMdw () {
  return async (ctx, next) => {
    if (ALLOWED_METHODS.has(ctx.request.method)) {
      // Asegura que haya un content-type definido
      if (!ctx.request.headers['content-type']) {
        ctx.request.headers['content-type'] = 'application/json'
      }

      // Si aún no se ha leído el cuerpo, lo lee como texto plano
      if (!ctx.req.rawBody) {
        ctx.req.rawBody = await new Promise((resolve, reject) => {
          let data = ''
          ctx.req.on('data', chunk => { data += chunk })
          ctx.req.on('end', () => resolve(data))
          ctx.req.on('error', err => reject(err))
        })
      }

      // Intenta parsear como JSON, si falla lo convierte como querystring
      if (ctx.req.rawBody) {
        try {
          ctx.request.body = JSON.parse(ctx.req.rawBody)
        } catch (err) {
          ctx.request.body = queryStringToJson(String(ctx.req.rawBody))
        }
      }
    }

    await next()
  }
}

/**
 * Middleware para validar el token JWT en el header Authorization
 * Si es válido, coloca los datos del usuario en `ctx.currentUser`
 * Si no es válido o está ausente, responde con error 401
 */
export const validateTokenMiddleware = async (ctx, next) => {
  const BEARER_START = 'Bearer '

  const checkStringStartWith = (str, start) => str.startsWith(start)

  // Valida si el token está presente y con formato correcto
  function checkTokenExists (token) {
    if (typeof token !== 'string') {
      throw new Error('Token not found')
    }

    if (!checkStringStartWith(token, BEARER_START)) {
      throw new Error('Token format is invalid')
    }

    return token.slice(BEARER_START.length)
  }

  let token = null

  try {
    token = checkTokenExists(ctx.headers.authorization)
    ctx.currentUser = await verifyToken(token)
  } catch (error) {
    ctx.status = 401
    ctx.body = { error: 'Token inválido o no proporcionado' }
    return
  }

  await next()
}

/**
 * Middleware para capturar errores que ocurran en la cadena de middlewares o rutas
 * Devuelve un estado y mensaje adecuado, y emite el error a nivel de aplicación
 */
export const errorCatcherMdw = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err?.cause?.code ?? 500
    ctx.body = err?.message ?? 'unknown error'
    ctx.app.emit('error', err, ctx)
  }
}
