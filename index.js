// index.js - Punto de entrada de la aplicación Koa
// Configura el servidor Koa, middlewares globales y las rutas

import Koa from 'koa'
import {
  bodyParserMdw,
  errorCatcherMdw,
  setFinalResponseMdw,
  setResponseTimeMdw
} from './middlewares.js'
import userRouter from './src/userRouter.js'
import 'dotenv/config'

const app = new Koa() // Instancia de la aplicación Koa
const PORT = process.env.PORT || 3000 // Constante para que Render asigne un puerto automáticamente
// Middlewares globales
app.use(errorCatcherMdw) // Maneja errores no capturados y envía respuestas consistentes
app.use(setFinalResponseMdw) // Formatea la respuesta final en un objeto unificado
app.use(setResponseTimeMdw) // Añade el tiempo de respuesta en los encabezados
app.use(bodyParserMdw()) // Parsea automáticamente el cuerpo JSON de las solicitudes

// Rutas de usuarios
app
  .use(userRouter.routes()) // Registra las rutas definidas para /user y /login
  .use(userRouter.allowedMethods()) // Habilita solo los métodos HTTP permitidos en las rutas

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`) // Mensaje de confirmación al iniciar el servidor
})
