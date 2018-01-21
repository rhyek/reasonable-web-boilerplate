import { Document } from 'mongoose'
import { createAction } from 'typesafe-actions'
import User from '../../../../shared/models/User'

export default {
  requestAll: createAction('USERS_REQUEST_ALL', () => ({
    type: 'USERS_REQUEST_ALL'
  })),
  receiveAll: createAction(
    'USERS_RECEIVE_ALL',
    (json: (User & Document)[]) => ({
      type: 'USERS_RECEIVE_ALL',
      payload: json
    })
  ),
  invalidateAll: createAction('USERS_INVALIDATE_ALL', () => ({
    type: 'USERS_INVALIDATE_ALL'
  }))
}
