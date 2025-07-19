import { userRepository } from '../database/userRepository.js'
import { hashPassword } from './utils/hashPassword.js'

export const getAllUsers = async (ctx) => {
  const users = await userRepository.getUsers()
  ctx.body = { ok: true, users }
}

export const getUserById = async (ctx) => {
  const id = ctx.params.id
  const user = await userRepository.getUserById(id)
  ctx.body = { ok: true, user }
}

export const createUser = async (ctx) => {
  console.log(ctx.request.body)
  const { name, email, password } = ctx.request.body

  const passwordHashed = await hashPassword(password)
  const userSaved = await userRepository.createUser({ name, email, password: passwordHashed })

  ctx.body = { ok: true, user: userSaved }
}

export const updateUser = async (ctx) => {
  const id = ctx.params.id
  const userData = ctx.request.body
  const updatedUser = await userRepository.updateUser(id, userData)

  ctx.body = { ok: true, user: updatedUser }
}

export const deleteUser = async (ctx) => {
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
