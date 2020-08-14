// Depenencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';

// Action/Auth Imports
import store from './store';
import { setCurrentUser, logoutUser } from './actions/userAuthActions';
import setAuthToken from './util/setAuthToken';

// Styling Imports
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

// General Component Imports
import Register from './components/general/Register';
import Login from './components/general/Login';
import ConfirmEmail from './components/general/ConfirmEmail';
import PrivacyPolicy from './components/general/PrivacyPolicy';
import TermsAndConditions from './components/general/TermsAndConditions';
import NotFound from './components/general/NotFound';

// Landing Page Imports
import Landing from './components/layout/Landing';

// Private Page Imports
import PrivateRoute from './components/auth/PrivateRoute';
import UserDashboard from './components/auth/dashboard/views/UserDashboard';
import EventManager from './components/auth/dashboard/views/EventManager';

import ViewUser from './components/auth/user/ViewUser';
import EditUser from './components/auth/user/EditUser';
import ViewRoster from './components/auth/rosters/ViewRoster';
import EditRoster from './components/auth/rosters/EditRoster';
import CreateRoster from './components/auth/rosters/CreateRoster';
import DeleteRoster from './components/auth/rosters/DeleteRoster';


if (localStorage.jwtToken) {
  //console.log("JWT found, refreshing auth token")
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

const App = () => {
  return (
    <Provider store={store} >
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>

        <div className='app-bg page-container'>
          <div className='content-wrap'>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/legal/privacy-policy' component={PrivacyPolicy} />
              <Route exact path='/legal/terms-and-conditions' component={TermsAndConditions} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/confirm/:id' component={ConfirmEmail} />
              
              <PrivateRoute exact path='/dashboard' component={UserDashboard} />
              <PrivateRoute exact path='/event-manager' component={EventManager} />

              <PrivateRoute exact path='/user/:username' component={ViewUser} />
              <PrivateRoute exact path='/user/:username/edit' component={EditUser} />
              <PrivateRoute exact path='/roster/create' component={CreateRoster} />
              <PrivateRoute exact path='/roster/:id' component={ViewRoster} />
              <PrivateRoute exact path='/roster/:id/edit' component={EditRoster} />
              <PrivateRoute exact path='/roster/:id/delete' component={DeleteRoster} />

              <Route component={NotFound} />
            </Switch>

          </div>
        </div>

      </Router>
    </Provider>
  );
}

export default App;