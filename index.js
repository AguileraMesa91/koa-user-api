import Koa from 'koa'
import { bodyParserMdw, errorCatcherMdw, setFinalResponseMdw, setResponseTimeMdw } from './middlewares.js'
import userRouter from './src/userRouter.js'

const app = new Koa()

app.use(errorCatcherMdw)
app.use(setFinalResponseMdw)
app.use(setResponseTimeMdw)
app.use(bodyParserMdw())

app
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
