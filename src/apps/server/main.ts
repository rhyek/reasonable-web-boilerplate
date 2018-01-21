import * as HttpStatus from 'http-status-codes'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import * as mongoose from 'mongoose'
import { api } from './controllers'
;(mongoose as any).Promise = global.Promise

const router = new Router().use(api.routes())

const app = new Koa()
  .use(bodyParser())
  .use(async (ctx, next) => {
    const body = await next()
    if (body && !ctx.body) {
      ctx.body = body
    }
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    if (ctx.status === HttpStatus.NOT_FOUND && ctx.accepts('html')) {
      ctx.body = `
        <html>
          <body>
            <div id="app" />
            <script type="text/javascript" src="http://localhost:8080/vendor.js"></script>
            <script type="text/javascript" src="http://localhost:8080/app.js"></script>
          </body>
        </html>
      `
    } else {
      await next()
    }
  })

mongoose
  .connect(
    'mongodb://localhost:27017/test',
    { useMongoClient: true } as any,
    undefined
  )
  .then(() => app.listen(3000, () => console.info('Listening on port 3000!')))
