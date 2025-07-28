// src/loginCtr.js - Controlador para manejar el inicio de sesión de usuarios

import { userRepository } from '../database/userRepository.js'
import { comparePassword } from './utils/hashPassword.js'
import { createToken } from './utils/tokenGenerator.js'

const signIn = async (ctx) => {
  try {
    const { email, password } = ctx.request.body // Extrae las credenciales del cuerpo de la solicitud
    // console.log('Email recibido:', email)

    if (!email || !password) {
      ctx.status = 400 // Campos obligatorios faltantes
      ctx.body = { ok: false, message: 'Email y contraseña son requeridos' }
      // console.log(' Email o contraseña faltantes')
      return
    }

    const foundUser = await userRepository.getUserByEmail(email) // Busca el usuario por email en la base de datos
    // console.log(' Usuario encontrado:', foundUser)

    if (!foundUser) {
      ctx.status = 401
      ctx.body = { ok: false, message: 'Usuario no encontrado' }
      // console.log(' Usuario no encontrado')
      return
    }

    const isValid = await comparePassword(password, foundUser.password) // Verifica la contraseña
    // console.log(' Contraseña válida:', isValid)

    if (!isValid) {
      ctx.status = 401
      ctx.body = { ok: false, message: 'Contraseña incorrecta' }
      // console.log(' Contraseña incorrecta')
      return
    }

    const jwt = createToken({ id: foundUser.id, email: foundUser.email }) // Genera un token JWT
    // console.log(' Token generado')

    const data = {
      id: foundUser.id,
      email: foundUser.email
    }

    ctx.body = {
      ok: true,
      data,
      jwt
    }
  } catch (err) {
    console.error(' Error en login:', err)
    ctx.status = 500
    ctx.body = { ok: false, message: 'Error interno en login' }
  }
}

export const loginCtr = {
  signIn
}
