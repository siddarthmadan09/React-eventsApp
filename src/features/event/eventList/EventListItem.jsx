import React, { Component } from 'react'
import { Segment, Item, Icon, Button, List} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
class EventListItem extends Component {
  render() {
    const {event, eventOpen, deleteEvent} = this.props
    return (
      <div>
             <Segment.Group>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                      <Item.Content>
                        <Item.Header as="a">{event.title}</Item.Header>
                        <Item.Description>
                          Hosted by <h5>{event.hostedBy}</h5>
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
                <Segment>
                  <span>
                    <Icon name="clock" /> {event.date}|
                    <Icon name="marker" /> {event.venue}
                  </span>
                </Segment>
                <Segment secondary>
                  <List horizontal>
                  {event.attendees && event.attendees.map((attendee) => (
                    <EventListAttendee key={attendee.id} attendee = {attendee} />
                  ))}         
                  </List>
                </Segment>
                <Segment clearing>
                    <span>{event.description}</span>
                  <Button as="a" color="teal" floated="right" content="Delete" onClick = {deleteEvent(event.id) } />
                  <Button as="a" color="teal" floated="right" content="View" onClick = {eventOpen(event) } />
                </Segment>
              </Segment.Group>
      </div>
    )
  }
}

export default EventListItem