import * as HttpStatus from 'http-status-codes'
import * as Router from 'koa-router'
import HttpError from '../../../../shared/errors/HttpError'
import User, { UserModel } from '../../../../shared/models/User'
import Context from '../../types/Context'

export default new Router({ prefix: '/users' })

  .get('/', async (ctx): Promise<User[]> => {
    return UserModel.find()
  })

  .post('/', async (ctx: Context<{}, User>): Promise<User> => {
    const { request: { body } } = ctx

    const user = new UserModel({
      ...body
    })
    await user.save()
    return user
  })

  .patch('/:id', async (ctx: Context<{ id: string }, User>): Promise<User> => {
    const { params: { id }, request: { body } } = ctx

    const user = await UserModel.findById(id)
    if (user) {
      user.set(body)
      await user.save()
      return user
    }
    throw new HttpError(HttpStatus.NOT_FOUND)
  })

  .del('/:id', async (ctx: Context<{ id: string }>): Promise<void> => {
    const { params: { id } } = ctx

    const user = await UserModel.findById(id)
    if (user) {
      await user.remove()
      return
    }
    throw new HttpError(HttpStatus.NOT_FOUND)
  })
