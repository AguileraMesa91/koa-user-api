// src/utils/tokenGenerator.js - Módulo para generar y verificar tokens JWT con jsonwebtoken

import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET_KEY // Clave secreta para firmar y verificar los tokens

// Genera un token JWT con el payload proporcionado y una expiración de 1 minuto
export function createToken (payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1m' })
}

// Verifica y decodifica un token JWT
export function verifyToken (token) {
  return jwt.verify(token, SECRET_KEY)
}
