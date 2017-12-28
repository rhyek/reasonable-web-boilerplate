import * as HttpStatus from 'http-status-codes'

export default class HttpError extends Error {
  expose = true
  
  constructor(public status: number, message?: string) {
    super(message || HttpStatus.getStatusText(status))
  }
}
