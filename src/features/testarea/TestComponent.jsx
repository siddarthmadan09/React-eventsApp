import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button } from 'semantic-ui-react'
import {incrementAsync, decrementAsync} from './testactions'
import {openModal} from '../modals/modalActions'
const mapState = (state) => ({
    data: state.test.data,
    loading:state.test.loading
})

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
}

class TestComponent extends Component {
  render() {
    const {incrementAsync, decrementAsync, data, openModal, loading} = this.props
    return (
      <div>
        <h1>Test area</h1>
        <h3> answer is {data} </h3>
        <Button loading={loading} content="Increment" onClick={incrementAsync} color='green'></Button>
        <Button loading={loading} content="Decrement" onClick={decrementAsync} color='red'></Button>
        <Button content="modal" onClick={() => openModal('TestModal', {data: 43})} color='teal'></Button>
      </div>
    )
  }
}

export default connect(mapState,actions)(TestComponent);