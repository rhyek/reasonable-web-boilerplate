import { asyncComponent } from 'react-async-component'

type Loader = () => Promise<any>

export default (loader: Loader) => {
  return asyncComponent({
    resolve: loader
  })
}
