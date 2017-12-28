import * as React from 'react'
import { asyncComponent } from 'react-async-component'

interface Loader {
  (): Promise<any>
}

const Loading = () => (
  <div>Loading...</div>
)

export default (loader: Loader) => {
  return asyncComponent({
    resolve: loader
  })
}
