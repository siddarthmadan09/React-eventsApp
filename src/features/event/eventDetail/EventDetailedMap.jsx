import React from 'react'
import {Segment, Icon } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'

const Marker = () => <Icon name='marker' size='big' color='red' />

const EventDetailedMap = ({lat, lng}) => {
    const center = [lat, lng];
    const zoom = 14
    return (
        <Segment attached="bottom" >
        <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC_fVdPjn42yGi-vQ7b5a1FQYYiRMHacFI' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
        <Marker
            lat={lng}
            lng={lng}
          />
        </GoogleMapReact>
      </div>
        </Segment>
    )
}

export default EventDetailedMap