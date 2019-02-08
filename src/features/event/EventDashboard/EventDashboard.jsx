import React, { Component } from 'react'
import {connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import EventList from '../eventList/EventList'
import { deleteEvent} from '../eventActions';

const mapState = (state) => ({
  events : state.events
})

const actions = {
  deleteEvent
}

class EventDashboard extends Component {

  handleDeleteEvent = deletedEventId => () => {
    this.props.deleteEvent(deletedEventId);
  //  const updatedEvents  = this.state.events.filter(event => event.id !== deletedEventId)
  //   this.setState({
  //     events:updatedEvents
  //   })
  }

  handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent)
    const {events} = this.props;
    this.setState({
      isOpen:false,
      selectedEvent:null
    })
  }

  handleOpenEvent = eventOpen => () => {
    this.setState({
      selectedEvent:eventOpen,
      isOpen:true
    })
  }

  render() {
    const {events} = this.props;
    return (
        <Grid>
        <Grid.Column width={10}>
         <EventList deleteEvent = {this.handleDeleteEvent} events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapState, actions)(EventDashboard)