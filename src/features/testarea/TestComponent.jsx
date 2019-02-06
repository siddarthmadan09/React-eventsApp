import React, { Component } from 'react'
import {connect} from 'react-redux'

const mapState = (state) => ({
    data: state.test.data
})
class TestComponent extends Component {
  render() {
    return (
      <div>
        <h1>Test area</h1>
        <h3> answer is {this.props.data} </h3>
      </div>
    )
  }
}

export default connect(mapState)(TestComponent);