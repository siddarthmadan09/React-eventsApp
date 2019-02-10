import React, { Component } from 'react'
import {connect } from 'react-redux'
import { Menu, Container, Button } from 'semantic-ui-react';
import {NavLink,Link,withRouter  } from "react-router-dom";
import SignedInMenu from '../menus/SignedInMenu';
import SignedOutMenu from '../menus/SignedOutMenu';
import { openModal } from "../../modals/modalActions";
import { withFirebase } from "react-redux-firebase";

const actions = {
  openModal
}

const mapState = (state) => ({
  auth : state.firebase.auth,
  profile: state.firebase.profile
})

class NavBar extends Component {

  handleSignIn = () => {
   this.props.openModal('LoginModal')
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/')
  }

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty
    return (
            <Menu inverted fixed="top">
              <Container>
                <Menu.Item header>
                  <img src="/assets/logo.png" alt="logo" />
                  Re-vents
                </Menu.Item>
                <Menu.Item  as= {NavLink} to = '/events' name="Events" />
                <Menu.Item  as= {NavLink} to = '/test' name="Test" />
                {authenticated &&
                <Menu.Item  as= {NavLink} to = '/people' name="People" />}
                {authenticated && 
                <Menu.Item>
                  <Button floated="right" as= {NavLink} to = '/createEvent' positive inverted content="Create Event" />
                </Menu.Item>}
                {authenticated ? (
                   <SignedInMenu auth = {auth} signOut = {this.handleSignOut} profile={profile} /> 
                ): (
                  <SignedOutMenu signIn = {this.handleSignIn} register={this.handleRegister} />
                )}             
              </Container>
            </Menu>
    )
  }
}

export default withRouter(withFirebase(connect(mapState,actions)(NavBar)))