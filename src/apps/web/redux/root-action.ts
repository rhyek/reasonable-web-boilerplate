import { getReturnOfExpression } from 'react-redux-typescript'
import homeActions from '../pages/Home/actions'
import userActions from '../pages/Users/actions'

export const allActions = {
  ...homeActions,
  ...userActions
}

const returnOfActions = Object.values(allActions).map(getReturnOfExpression)
type AppAction = typeof returnOfActions[number]

type RootAction = AppAction

export default RootAction
