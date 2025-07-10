import Router from '@koa/router'
import { userCtr } from './userCtr.js'

const router = new Router()

router.get('/user', userCtr.getAllUsers)
router.get('/user/:id', userCtr.getUserById)
router.post('/user', userCtr.createUser)
router.put('/user/:id', userCtr.updateUser)
router.delete('/user/:id', userCtr.deleteUser)

export default router
