import * as yup from 'yup'

const validationConfig = { abortEarly: true, stripUnknown: true }

const schema = yup.object({
  email: yup.string().trim().required().email(),
  name: yup.string().trim().required(),
  password: yup.string().trim().required()
}).required()

export async function validateUpdateUserMdw (ctx, next) {
  const data = schema.validateSync(ctx.request.body, validationConfig)

  ctx.request.body = data
  await next()
}
