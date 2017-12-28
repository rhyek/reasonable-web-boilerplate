import { getReturnOfExpression } from 'react-redux-typescript'
import homeActions from '../pages/Home/actions'

export const allActions = {
  ...homeActions
}

const returnOfActions =
  Object.values(allActions).map(getReturnOfExpression)
type AppAction = typeof returnOfActions[number]

type RootAction = | AppAction

export default RootAction
