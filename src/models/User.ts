import * as mongoose from 'mongoose'
import { prop, Typegoose } from 'typegoose'

export default class User extends Typegoose {
  @prop()
  name: string
  @prop()
  password: string
}

export const UserModel = new User().getModelForClass(User, { existingMongoose: mongoose })
