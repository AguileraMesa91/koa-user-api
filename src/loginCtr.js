// src/loginCtr.js - Controlador para manejar el inicio de sesión de usuarios

import { userRepository } from '../database/userRepository.js'
import { comparePassword } from './utils/hashPassword.js'
import { createToken } from './utils/tokenGenerator.js'

const signIn = async (ctx) => {
  const { email, password } = ctx.request.body // Extrae las credenciales del cuerpo de la solicitud

  if (!email || !password) {
    ctx.status = 400 // Campos obligatorios faltantes
    return
  }

  const foundUser = await userRepository.getUserByEmail(email) // Busca el usuario por email en la base de datos

  const isValid = foundUser && await comparePassword(password, foundUser.password) // Verifica la contraseña

  if (!isValid) {
    ctx.status = 401 // Credenciales inválidas
    return
  }

  const jwt = createToken({ id: foundUser.id, email: foundUser.email }) // Genera un token JWT

  const data = {
    id: foundUser.id,
    email: foundUser.email
  }

  ctx.body = {
    ok: true,
    data,
    jwt
  }
}

export const loginCtr = {
  signIn
}
