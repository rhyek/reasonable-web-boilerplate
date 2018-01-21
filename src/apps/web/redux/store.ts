import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from '../redux/reducers'

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const newRootReducer = require('./reducers').default
      store.replaceReducer(newRootReducer)
    })
  }

  return store
}
