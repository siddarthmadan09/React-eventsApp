import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/event/eventDetail/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/eventform/EventForm';
import TestComponent from '../../features/testarea/TestComponent';
// import ModalManager from '../../features/modals/ModalManager';
// import { UserIsAuthenticated } from '../../features/auth/authWrapper';
// import NotFound from '../../app/layout/NotFound'

class App extends Component {
  render() {
    return (
      <div>
        {/* <ModalManager/> */}
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={EventDashboard} />
                   <Route path="/test" component={TestComponent} /> 
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route path="/manage/:id" component={EventForm} />
                  <Route path="/people" component={PeopleDashboard} />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/settings" component={SettingsDashboard} />
                  <Route path="/createEvent" component={EventForm} />
                  {/* <Route path="/error" component={NotFound} /> */}
                  {/* <Route component={NotFound} /> */}
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;