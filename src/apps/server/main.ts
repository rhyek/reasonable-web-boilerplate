import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import 'reflect-metadata'
import HttpError from '../../errors/HttpError'
import controllers from './controllers'

(<any>mongoose).Promise = global.Promise

export const app = express()

app.use(bodyParser.json())
app.use('/', controllers)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.status)
  }
  next(error)
})

mongoose
  .connect('mongodb://localhost:27017/test', { useMongoClient: true } as any, undefined)
  .then(() => app.listen(3000, () => console.log('Listening on port 3000!')))
