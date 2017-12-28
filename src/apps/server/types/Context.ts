import * as Koa from 'koa'

interface Request<B = any> extends Koa.Request {
  body: B
}

export default interface Context<P = any, B = any> extends Koa.Context {
  params: P,
  request: Request<B>
}