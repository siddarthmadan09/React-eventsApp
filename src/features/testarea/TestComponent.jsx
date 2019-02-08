import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button } from 'semantic-ui-react'
import {incrementCounter, decrementCounter} from './testactions'
import {openModal} from '../modals/modalActions'
const mapState = (state) => ({
    data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter,
  openModal
}

class TestComponent extends Component {
  render() {
    const {incrementCounter, decrementCounter, data, openModal} = this.props
    return (
      <div>
        <h1>Test area</h1>
        <h3> answer is {data} </h3>
        <Button content="Increment" onClick={incrementCounter} color='green'></Button>
        <Button content="Decrement" onClick={decrementCounter} color='red'></Button>
        <Button content="modal" onClick={() => openModal('TestModal', {data: 43})} color='teal'></Button>
      </div>
    )
  }
}

export default connect(mapState,actions)(TestComponent);