import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import RootState from '../../redux/root-state'
import actions from './actions'
import { State as HomeState } from './reducer'

interface DataProps {
  home: HomeState
}

interface ActionProps {
  update: (name: string, value: string) => any
}

class Component extends React.Component<DataProps & ActionProps> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    this.props.update(name, value)
  }

  render() {
    const { home } = this.props

    return (
      <Main>
        <h1>Home</h1>
        <form>
          <div>
            <label>Message</label>
            <input
              name="message"
              type="text"
              value={home.message}
              onChange={this.handleChange}
            />
          </div>
        </form>
      </Main>
    )
  }
}

const mapStateToProps = (state: RootState): DataProps => ({
  home: state.home
})

export default connect(mapStateToProps, {
  update: actions.update
})(Component)

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > form {
    > div {
      label {
        display: block;
        :after {
          content: ':';
        }
      }
    }
  }
`
