// src/validateUpdateUserMdw.js - Middleware para validar datos al actualizar usuarios
// Valida que el cuerpo de la solicitud contenga email, nombre y contraseña válidos según el esquema definido

import * as yup from 'yup'

// Configuración de yup: aborta la validación en el primer error encontrado y elimina campos no definidos en el esquema
const validationConfig = { abortEarly: true, stripUnknown: true }

const schema = yup.object({
  email: yup.string().trim().required().email(), // Email requerido y debe ser un email válido
  name: yup.string().trim().required(), // Nombre requerido
  password: yup.string().trim().required() // Contraseña requerida
}).required() // El objeto completo debe estar presente y cumplir el esquema

export async function validateUpdateUserMdw (ctx, next) {
  // Valida los datos del cuerpo de la solicitud contra el esquema
  // En caso de error, yup lanzará una excepción que debería manejarse externamente (middleware de error)
  const data = schema.validateSync(ctx.request.body, validationConfig)

  ctx.request.body = data // Sobrescribe el cuerpo con los datos validados y limpios
  await next() // Continúa con el siguiente middleware o controlador
}
