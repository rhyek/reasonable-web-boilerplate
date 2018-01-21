import { State as HomeState } from '../pages/Home/reducer'
import { State as UsersState } from '../pages/Users/reducer'

export default interface RootState {
  home: HomeState
  users: UsersState
}
