import { combineReducers } from 'redux'
import home from '../pages/Home/reducer'
import RootState from './root-state'
import RootAction from './root-action'

export default combineReducers<RootState>({
  home
})
