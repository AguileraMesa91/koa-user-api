// userRepository.js - Repositorio para operaciones CRUD sobre usuarios
// Utiliza executeQuery de db.js para interactuar con la base de datos

import { executeQuery } from './db.js'

async function getUsers () {
  // Devuele todos los usuarios
  const query = 'SELECT * FROM users'
  const res = await executeQuery(query)
  return res
}

async function getUserById (id) {
  // Devuelve un usuario por su ID
  const query = 'SELECT * FROM users WHERE id = $1'
  const params = [id]
  const res = await executeQuery(query, params)
  return res[0]
}

async function getUserByEmail (email) {
  // Devuelve un usuario por su email
  const query = 'SELECT * FROM users WHERE email = $1'
  const params = [email]
  const res = await executeQuery(query, params)
  return res[0]
}

async function createUser ({ name, email, password }) {
  // Función para crear un nuevo usuario
  const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'
  const params = [name, email, password]
  const res = await executeQuery(query, params)
  return res[0]
}

async function updateUser ({ id, name, email, password }) {
  // Función para actualizar un usuario por su ID
  const query = `
    UPDATE users
    SET name = $2, email = $3, password = $4
    WHERE id = $1
    RETURNING *`
  const params = [id, name, email, password]
  const res = await executeQuery(query, params)
  return res[0]
}

async function deleteUser (id) {
  // Función para eliminar un usuario por su ID
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *'
  const params = [id]
  const res = await executeQuery(query, params)
  return res[0]
}

export const userRepository = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
}
