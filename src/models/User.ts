import * as mongoose from 'mongoose'
import { prop, Typegoose } from 'typegoose'

export default class UserDocument extends Typegoose {
  @prop()
  name: string
  @prop()
  password: string
}

export const UserModel = new UserDocument().getModelForClass(UserDocument, { existingMongoose: mongoose })