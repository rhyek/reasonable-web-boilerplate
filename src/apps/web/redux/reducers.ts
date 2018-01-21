import { combineReducers } from 'redux'
import home from '../pages/Home/reducer'
import users from '../pages/Users/reducer'
import RootState from './root-state'

export default combineReducers<RootState>({
  home,
  users
})
