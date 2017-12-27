import * as fs from 'fs'
import * as path from 'path'
import * as express from 'express'
import { underscore, dasherize } from 'inflected'
import HttpMethod from '../../../enums/HttpMethod'
import Controller from '../../../types/Controller'

export const routers: [string, express.Router][] = []

function walk(breadcrumb: string[] = ['']) {
  const rootPath = path.join(__dirname, ...breadcrumb)
  for (const file of fs.readdirSync(rootPath)) {
    const filePath = path.join(rootPath, file)
    const stats = fs.statSync(filePath)
    if (stats.isDirectory() && file !== '.' && file !== '..') {
      walk([...breadcrumb, file])
    }
    else if (file.endsWith('.ts')) {
      const defaultExport = require(filePath).default
      if (defaultExport && defaultExport.prototype instanceof Controller) {
        const customEndpoint = Reflect.getMetadata('path', defaultExport)
        const router = express.Router()
        const parts = breadcrumb
          .map(part => dasherize(underscore(part)))
        if (customEndpoint != null) {
          parts.push(customEndpoint)
        }
        else {
          parts.push(dasherize(underscore(path.basename(filePath, '.ts'))))
        }
        const routerPath = parts.join('/')
        routers.push([routerPath, router])
        for (const propertyName of Object.getOwnPropertyNames(defaultExport.prototype)) {
          const method: HttpMethod = Reflect.getMetadata('method', defaultExport.prototype, propertyName)
          const endpointPath = Reflect.getMetadata('path', defaultExport.prototype, propertyName)
          const successStatusCode = Reflect.getMetadata('successStatusCode', defaultExport.prototype, propertyName)
          if (method && endpointPath != null) {
            router[method](endpointPath, (req: express.Request, res: express.Response, next: express.NextFunction) => {
              const controller = new defaultExport(req, res)
              res.status(successStatusCode || 200)
              Promise
                .resolve(controller[propertyName].apply(controller, [...Object.values(req.params), req.body]))
                .then((result) => {
                  if (typeof result === 'object') {
                    res.json(result)
                  }
                  else {
                    res.send(result)
                  }
                })
                .catch(error => next(error))
            })
          }
        }
      }
    }
  }
}

walk()
const root = express.Router()
for (const router of routers) {
  root.use(router[0], router[1])
}

export default root