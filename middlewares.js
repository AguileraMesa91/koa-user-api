async function setFinalResponseMdw (ctx, next) {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
}

async function setResponseTimeMdw (ctx, next) {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
}

// exportar mis middlewares con comonjs
