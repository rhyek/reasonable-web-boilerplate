import * as HttpStatus from 'http-status-codes'
import User, { UserModel } from '../../../..//models/User'
import HttpError from '../../../../errors/HttpError'
import Controller, { route, get, post, patch, del } from '../../../../types/Controller'

export default class extends Controller {
  @get()
  async index(): Promise<User[]> {
    return await UserModel.find()
  }

  @post()
  async post(json: User): Promise<User> {
    const user = new UserModel({
      ...json
    })
    await user.save()
    return user
  }

  @patch('/:id')
  async patch(id: string, json: User): Promise<User> {
    const user = await UserModel.findById(id)
    if (user) {
      user.set(json)
      await user.save()
      return user
    }
    throw new HttpError(HttpStatus.NOT_FOUND)
  }

  @del('/:id')
  async del(id: string): Promise<void> {
    const user = await UserModel.findById(id)
    if (user) {
      await user.remove()
      return
    }
    throw new HttpError(HttpStatus.NOT_FOUND)
  }
}