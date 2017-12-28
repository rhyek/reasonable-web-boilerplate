import * as React from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import styled from 'styled-components'
import asyncComponent from './components/asyncComponent'

const Home = asyncComponent(() => import('./pages/Home'))
const Users = asyncComponent(() => import('./pages/Users'))

export default () => (
  <Router>
    <Main>
      <nav>
        <NavLink to="/" exact>Home</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/users" component={Users} />
      </div>
    </Main>
  </Router>
)

const Main = styled.div`
  > nav {
    > a {
      :not(:last-child) {
        margin-right: 10px;
      }
    }
  }
`
