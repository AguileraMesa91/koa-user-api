// src/userCtr.js - Módulo de controlador de usuarios
// Define funciones para manejar operaciones CRUD sobre usuarios

import { userRepository } from '../database/userRepository.js'
import { hashPassword } from './utils/hashPassword.js'

export const getAllUsers = async (ctx) => { // Lista todos los usuarios
  const users = await userRepository.getUsers()
  ctx.body = { ok: true, users }
}

export const getUserById = async (ctx) => { // Obtiene un usuario por ID
  const id = ctx.params.id
  const user = await userRepository.getUserById(id)
  ctx.body = { ok: true, user }
}

export const createUser = async (ctx) => { // Crea un nuevo usuario
  const { name, email, password } = ctx.request.body
  const passwordHashed = await hashPassword(password)
  const userSaved = await userRepository.createUser({
    name,
    email,
    password: passwordHashed
  })
  ctx.body = { ok: true, user: userSaved }
}

export const updateUser = async (ctx) => {
  const id = ctx.params.id
  const { name, email, password } = ctx.request.body

  const passwordHashed = await hashPassword(password)
  const userupdated = await userRepository.updateUser({
    id,
    name,
    email,
    password: passwordHashed
  })
  ctx.body = { ok: true, user: userupdated }
}

export const deleteUser = async (ctx) => { // Elimina un usuario por su ID
  const id = ctx.params.id
  await userRepository.deleteUser(id)

  ctx.body = { ok: true }
}

export const userCtr = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
