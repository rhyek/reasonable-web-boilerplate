import { Document } from 'mongoose'
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import styled from 'styled-components'
import User from '../../../../shared/models/User'
import RootState from '../../redux/root-state'
import thunks from './thunks'

interface DataProps {
  users: (User & Document)[]
}

interface DispatchProps {
  fetchAll: () => any
  refresh: () => any
}

class Component extends React.Component<DataProps & DispatchProps> {
  componentDidMount() {
    this.props.fetchAll()
  }

  render() {
    const { users, refresh } = this.props

    return (
      <Main>
        <h1>Users!</h1>
        <button type="button" onClick={refresh}>
          Refresh
        </button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Main>
    )
  }
}

const mapStateToProps = (state: RootState): DataProps => ({
  users: state.users.users
})

const mapDispatchToProps = (dispatch: Dispatch<RootState>): DispatchProps => ({
  fetchAll: () => dispatch(thunks.fetchAll()),
  refresh: () => dispatch(thunks.refresh())
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)

const Main = styled.div``
