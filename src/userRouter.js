// src/userRouter.js - Módulo de enrutador de usuarios
// Define las rutas y middleware para manejar las operaciones CRUD y Login de usuarios

import Router from '@koa/router'
import { userCtr } from './userCtr.js'
import { loginCtr } from './loginCtr.js'
import { validateTokenMiddleware } from '../middlewares.js'
import { validateUpdateUserMdw } from './validateUpdateUserMdw.js'

const router = new Router() // Nueva instancia del enrutador Koa

router.post('/login', loginCtr.signIn) // POST /login - Ruta pública para iniciar sesión
router.post('/user', validateUpdateUserMdw, userCtr.createUser) // POST /user - Ruta para crear un usuario, con validación

router.get('/user', validateTokenMiddleware, userCtr.getAllUsers) // GET /user - Ruta protegida para listar usuarios
router.get('/user/:id', validateTokenMiddleware, userCtr.getUserById) // GET /user/:id - Ruta protegida para obtener un usuario por ID
router.put('/user/:id', validateTokenMiddleware, userCtr.updateUser) // PUT /user/:id - Ruta protegida para actualizar un usuario por ID
router.delete('/user/:id', validateTokenMiddleware, userCtr.deleteUser) // DELETE /user/:id - Ruta protegida para eliminar un usuario por ID

export default router
