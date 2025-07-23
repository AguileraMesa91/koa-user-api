// src/utils/hashPassword.js - Módulo para manejar el hashing seguro de contraseñas con bcrypt

import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10 // Número de iteraciones internas que usa bcrypt para aumentar la seguridad del hash

// Hashea una contraseña con bcrypt
export async function hashPassword (password) {
  return bcrypt.hash(password, SALT_ROUNDS)
}

// Compara una contraseña con su hash
export async function comparePassword (password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword)
}
