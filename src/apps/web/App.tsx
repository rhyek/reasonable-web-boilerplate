import * as React from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
const hot = require('react-hot-loader').hot
import asyncComponent from './components/asyncComponent'

const Home = asyncComponent(() => import('./pages/Home'))
const Users = asyncComponent(() => import('./pages/Users'))

const App = () => (
  <Router>
    <Main>
      <header>
        <img src={require('./assets/images/smile.png')} />
        <nav>
          <NavLink to="/" exact={true}>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
      </header>
      <div>
        <Route path="/" exact={true} component={Home} />
        <Route path="/users" component={Users} />
      </div>
    </Main>
  </Router>
)

export default hot(module)(App)

const Main = styled.div`
  > header {
    display: flex;
    flex-direction: row;
    align-items: center;
    > img {
      max-height: 100px;
    }
    > nav {
      flex: 1;
      > a {
          margin-left: 10px;
          text-decoration: none;
          &:visited {
            color: initial;
          }
          &.active {
            font-weight: bold;
          }
        }
      }
    }
  }
`
