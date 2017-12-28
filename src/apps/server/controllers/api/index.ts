import * as Router from 'koa-router'
import users from './users'

export default new Router({ prefix: '/api' })
  .use(users.routes())
