import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/userAuthActions";

import './App.css';

import NavigationBar from "./components/layout/NavigationBar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/layout/Register";
import Login from "./components/layout/Login";
import ConfirmEmail from "./components/layout/ConfirmEmail";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/user/Dashboard";
import ViewUser from "./components/user/ViewUser";
import EditUser from "./components/user/EditUser";
import ViewRoster from "./components/rosters/ViewRoster";
import EditRoster from "./components/rosters/EditRoster";
import CreateRoster from "./components/rosters/CreateRoster";
import DeleteRoster from "./components/rosters/DeleteRoster";


if (localStorage.jwtToken) {
  //console.log("JWT found, refreshing auth token")
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

var authenticated = () => {
  if(localStorage.jwtToken){
    return true;
  } else {
    return false;
  }
}

function App() {
  return (
    <Provider store={store} >
      <Router>
        <div className="app-bg">
          <NavigationBar authenticated={authenticated()}/>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/confirm/:id" component={ConfirmEmail} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/:username" component={ViewUser} />
            <PrivateRoute exact path="/editprofile" component={EditUser} />
            <PrivateRoute exact path="/roster/create" component={CreateRoster} />
            <PrivateRoute exact path="/roster/:id" component={ViewRoster} />
            <PrivateRoute exact path="/roster/:id/edit" component={EditRoster} />
            <PrivateRoute exact path="/roster/:id/delete" component={DeleteRoster} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>

  );
}

export default App;
