import { userRepository } from '../database/userRepository.js'
import { comparePassword } from './utils/hashPassword.js'
import { createToken } from './utils/tokenGenerator.js'

const signIn = async (ctx) => {
  const { email, password } = ctx.request.body

  if (!email || !password) {
    ctx.status = 400
    return
  }

  const foudUser = await userRepository.getUserByEmail(email)

  const passwordMarch = await comparePassword(password, foudUser.password)

  if (!passwordMarch) {
    ctx.status = 401
    return
  }

  const jwt = createToken({ id: foudUser.id, email: foudUser.email })

  const data = {
    id: foudUser.id,
    email: foudUser.email
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
