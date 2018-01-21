import { Reducer } from 'redux'
import { getType } from 'typesafe-actions'
import RootAction from '../../redux/root-action'
import actions from './actions'

export interface State {
  readonly message: string
}

const initialState: State = {
  message: ''
}

const reducer: Reducer<State> = (state = initialState, action: RootAction) => {
  switch (action.type) {
    case getType(actions.update):
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default reducer
