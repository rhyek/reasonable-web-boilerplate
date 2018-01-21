import { Document } from 'mongoose'
import { Reducer } from 'redux'
import { getType } from 'typesafe-actions'
import User from '../../../../shared/models/User'
import RootAction from '../../redux/root-action'
import actions from './actions'

export interface State {
  readonly isLoading: boolean
  readonly users: (User & Document)[]
  readonly isInvalidated: boolean
}

const initialState: State = {
  isLoading: false,
  users: [],
  isInvalidated: true
}

const reducer: Reducer<State> = (state = initialState, action: RootAction) => {
  switch (action.type) {
    case getType(actions.requestAll):
      return {
        ...state,
        isLoading: true
      }
    case getType(actions.receiveAll):
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        isInvalidated: false
      }
    case getType(actions.invalidateAll):
      return {
        ...state,
        users: [],
        isInvalidated: true
      }
    default:
      return state
  }
}

export default reducer
