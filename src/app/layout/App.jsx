import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';
import Loadable from 'react-loadable'
import EventDetailedPage from '../../features/event/eventDetail/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/eventform/EventForm';
import TestComponent from '../../features/testarea/TestComponent';
import ModalManager from '../../features/modals/ModalManager';
// import { UserIsAuthenticated } from '../../features/auth/authWrapper';
import NotFound from '../../app/layout/NotFound'
import LoadingComponent from './LoadingComponent';

const AsyncHomePage  = Loadable({
  loader: () => import('../../features/home/HomePage'),
  loading : LoadingComponent
})
const AsyncEventForm  = Loadable({
  loader: () => import('../../features/event/eventform/EventForm'),
  loading : LoadingComponent
})
const AsyncNavBar  = Loadable({
  loader: () => import('../../features/nav/NavBar/NavBar'),
  loading : LoadingComponent
})
const AsyncEventDashboard  = Loadable({
  loader: () => import('../../features/event/EventDashboard/EventDashboard'),
  loading : LoadingComponent
})
const AsyncSettingsDashboard  = Loadable({
  loader: () => import('../../features/user/settings/SettingsDashboard'),
  loading : LoadingComponent
})
class App extends Component {
  render() {
    return (
      <div>
        <ModalManager/>
        <Switch>
          <Route exact path="/" component={AsyncHomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/events" component={AsyncEventDashboard} />
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route path="/manage/:id" component={AsyncEventForm} />
                  <Route path="/people" component={PeopleDashboard} />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/settings" component={AsyncSettingsDashboard} />
                  <Route path="/createEvent" component={AsyncEventForm} />
                  <Route path="/error" component={NotFound} /> 
                  <Route component={NotFound} />
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