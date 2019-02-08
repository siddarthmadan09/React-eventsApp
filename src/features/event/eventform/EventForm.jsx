/*global google*/
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {composeValidators, combineValidators, isRequired, hasLengthGreaterThan  } from "revalidate";
import {reduxForm, Field} from 'redux-form'
import { Segment,Form,Button, Header, Grid } from "semantic-ui-react";
import Script from 'react-load-script';
import {createEvent, updateEvent} from '../eventActions'
import cuid from 'cuid'
import TextInput from "../../../app/common/form/TextInput";
import Textarea from "../../../app/common/form/Textarea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import moment from 'moment';
import PlaceInput from "../../../app/common/form/PlaceInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const emptyEvent = {
  title : '',
  date : '',
  city:'',
  venue:'',
  hostedBy:''
}

const actions = {
  createEvent,
  updateEvent
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {}

  if(eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  }
}

const validate = combineValidators({
  title:isRequired({message : 'The event title is required'}),
  category:isRequired({message : 'Please provide a category'}),
  description:composeValidators(
    isRequired({message : 'Please enter a description'}),
    hasLengthGreaterThan(4)({message: 'Desciption needs to be atleast 5 char'})
  )(),
  city: isRequired('city'),
  venue:isRequired('venue'),
  date: isRequired('date')
})

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venuLatLng: {},
  scriptLoaded: false
  }

  handleScriptLoaded = () => this.setState({scriptLoaded : true})

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
    .then(results => getLatLng(results[0]))
    .then(latlng => {
      this.setState({
        cityLatLng : latlng
      })
    })
    .then(() => {
      this.props.change('city',selectedCity)
    })
  }

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
    .then(results => getLatLng(results[0]))
    .then(latlng => {
      this.setState({
        venuLatLng : latlng
      })
    })
    .then(() => {
      this.props.change('venue',selectedVenue)
    })
  }

  handleSubmit = (values) => {
    values.date = moment(values.date).format()
    values.venuLatLng = this.state.venuLatLng
    if( this.props.initialValues.id ) {
      this.props.updateEvent(values)
      this.props.history.goBack();
    } else {
      const newEvent = {
          ...values,
          id:cuid(),
          hostPhotoURL : '/assets/user.png',
          hostedBy:'Bob'
      }
    this.props.createEvent(newEvent)
    this.props.history.push('/events')
    }


  }

  render() {
    const {invalid, submitting, pristine} = this.props
    return (
      <Grid>
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_fVdPjn42yGi-vQ7b5a1FQYYiRMHacFI&libraries=places"
            onLoad={this.handleScriptLoaded} />
      <Grid.Column width = {10}>
        <Segment>
          <Header sub color="teal" content='Event Details'></Header>
                <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                  <Field name="title" type='text' component={TextInput} placeholder="give your event a name" />
                  <Field name="category" type='text' component={SelectInput} options = {category} placeholder="what is your event about" />
                  <Field name="description" type='text' component={Textarea} rows={3} placeholder="Tell us about you event" />
                  <Header sub color='teal' content='Event Loation details' />
                  <Field name="city"
                   type='text'
                    component={PlaceInput}
                     options={{
                       types: ['(cities)'] }} 
                     placeholder="Event City" 
                     onSelect={this.handleCitySelect}
                     />
                 {this.state.scriptLoaded && <Field name="venue" type='text' component={PlaceInput} 
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius:1000,
                    types: ['establishment'] }} 
                    onSelect={this.handleVenueSelect}
                  placeholder="Event venue" /> }
                  <Field name="date" type='text' component={DateInput} dateFormat='YYYY-MM-DD HH:mm' timeFormat="HH:mm" showTimeSelect placeholder="date and time of event" />
                  <Button disabled = {invalid || submitting ||pristine } positive type="submit" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                  <Button  onClick={this.props.history.goBack} type="button">Cancel</Button>
                </Form>
              </Segment>
      </Grid.Column>
      </Grid>      
    )
  }
}

export default connect(mapState, actions)(reduxForm({form : 'eventForm', enableReinitialize: true, validate})(EventForm));