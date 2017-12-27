import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Redbox from 'redbox-react'
import App from './App'

const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer errorReporter={({ error }) => <Redbox error={error} />}>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', async () => {
    const NewApp = require('./App').default
    render(NewApp)
  })
}