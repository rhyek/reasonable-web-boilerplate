import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import Redbox from 'redbox-react'
import { devToolsEnhancer } from 'redux-devtools-extension'
import reducers from './redux/reducers'

const store = createStore(
  reducers,
  devToolsEnhancer({})
)

const render = () => {
  const App = require('./App').default

  ReactDOM.render(
    <AppContainer
      key={Math.random()} // https://github.com/ctrlplusb/react-async-component/issues/14
      errorReporter={({ error }) => (
        <Redbox error={error} />
      )}
      warnings={false}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

if (module.hot) {
  module.hot.accept('./App', () => {
    render()
  })
}

render()