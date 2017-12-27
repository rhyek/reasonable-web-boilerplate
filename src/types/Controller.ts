import { Request, Response } from 'express'
import HttpMethod from '../enums/HttpMethod';

export default abstract class Controller {
  constructor(public readonly request: Request, public readonly response: Response) {}
}

export function route(path?: string) {
  return function(constructor: Function) {
    if (path != null) {
      Reflect.defineMetadata('path', path, constructor)
    }
  }
}

function endpointFactory (method: HttpMethod, path: string = '', successStatusCode: number = 200) {
  return function(target: Object, property: string) {
    Reflect.defineMetadata('method', method, target, property)
    Reflect.defineMetadata('path', path, target, property)
    Reflect.defineMetadata('successStatusCode', successStatusCode, target, property)
  }
}

export function get(path?: string) {
  return endpointFactory(HttpMethod.GET, path)
}

export function post(path?: string) {
  return endpointFactory(HttpMethod.POST, path, 201)
}

export function patch(path?: string) {
  return endpointFactory(HttpMethod.PATCH, path)
}

export function put(path?: string) {
  return endpointFactory(HttpMethod.PUT, path)
}

export function del(path?: string) {
  return endpointFactory(HttpMethod.DELETE, path)
}