import axios from 'axios'
import { Document } from 'mongoose'
import { Dispatch } from 'react-redux'
import User from '../../../../shared/models/User'
import RootState from '../../redux/root-state'
import actions from './actions'

function fetchAll() {
  return async (dispatch: Dispatch<RootState>, getState: () => RootState) => {
    const state = getState()
    if (state.users.isInvalidated) {
      dispatch(actions.requestAll())
      const { data: users } = await axios.get<(User & Document)[]>(
        'http://localhost:3000/api/users'
      )
      dispatch(actions.receiveAll(users))
    }
  }
}

function refresh() {
  return (dispatch: Dispatch<RootState>) => {
    dispatch(actions.invalidateAll())
    dispatch(fetchAll())
  }
}

export default {
  fetchAll,
  refresh
}
