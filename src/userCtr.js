import { UserRepository } from '../database/userRepository.js'
import { hashPassword } from './utils/hashPassword.js'

export const getAllUsers = async (ctx) => {
  const users = await UserRepository.getUsers()
  ctx.body = { ok: true, users }
}

export const getUserById = async (ctx) => {
  const id = ctx.params.id
  const user = await UserRepository.getUserById(id)
  ctx.body = { ok: true, user }
}

export const createUser = async (ctx) => {
  console.log(ctx.request.body)
  const { name, email, password } = ctx.request.body

  const passwordHashed = await hashPassword(password)
  const userSaved = await UserRepository.createUser({ name, email, password: passwordHashed })

  ctx.body = { ok: true, user: userSaved }
}

export const updateUser = async (ctx) => {
  const id = ctx.params.id
  const userData = ctx.request.body
  const updatedUser = await UserRepository.updateUser(id, userData)

  ctx.body = { ok: true, user: updatedUser }
}

export const deleteUser = async (ctx) => {
  const id = ctx.params.id
  await UserRepository.deleteUser(id)

  ctx.body = { ok: true }
}

export const userCtr = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
