import { executeQuery } from './db.js'

async function getUsers () {
  const query = 'SELECT * FROM users'
  const res = await executeQuery(query)
  return res
}

async function getUserById (id) {
  const query = 'SELECT * FROM users WHERE id = $1'
  const params = [id]
  const res = await executeQuery(query, params)
  return res[0]
}

async function createUser (name, email, password) {
  const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'
  const params = [name, email, password]
  const res = await executeQuery(query, params)
  return res[0]
}

async function updateUser (id, name, email, password) {
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
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *'
  const params = [id]
  const res = await executeQuery(query, params)
  return res[0]
}

export const UserRepository = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
