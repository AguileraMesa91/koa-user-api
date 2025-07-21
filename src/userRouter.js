import Router from '@koa/router'
import { userCtr } from './userCtr.js'
import { loginCtr } from './loginCtr.js'
import { validateTokenMiddleware } from '../middlewares.js'
import { validateUpdateUserMdw } from './validateUpdateUserMdw.js'

const router = new Router()

router.post('/login', loginCtr.signIn)
router.post('/user', validateUpdateUserMdw, userCtr.createUser)

router.get('/user', validateTokenMiddleware, userCtr.getAllUsers)
router.get('/user/:id', validateTokenMiddleware, userCtr.getUserById)
router.put('/user/:id', validateTokenMiddleware, userCtr.updateUser)
router.delete('/user/:id', validateTokenMiddleware, userCtr.deleteUser)

export default router
