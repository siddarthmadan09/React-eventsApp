import React from 'react'
import { Header, Segment, Feed, Sticky } from 'semantic-ui-react'
// import EventActivityItem from './EventActivityItem'

const EventActivity = ({activities, contextRef}) => {
  return (
    <div>
      <Header attached='top' content='Recent Activity'/>
      <Segment attached>
        <p> Recent activity </p>
      </Segment>
      </div>
  )
}

export default EventActivity