import axios from 'axios';
import setAuthToken from '../util/setAuthToken';
import jwt_decode from 'jwt-decode';
import { getCorrectPath } from '../util/developmentHelper';

import { GET_ERRORS, SET_CURRENT_USER } from './types';


/**
 * Register User then Redirect to Login or Send Errors to Component
 * @param {Object} userData 
 * @param {React Router History} history 
 */
export const registerUser = (userData, history) => dispatch => {
  const registerUserRoute = getCorrectPath('/api/users/register');
  axios.post(registerUserRoute, userData)
    .then(res => {
      history.push({
        pathname: '/login',
        state: { toast_message: 'Please confirm email before logging in, check inbox or spam folder.' }
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


/**
 * Edit User Document then Redirect to Dashboard or Send Errors to Component
 * @param {Object} userData 
 * @param {React Router History} history 
 */
export const editUser = (userData, history) => dispatch => {
  const editUserRoute = getCorrectPath(`/api/users/${userData.username}/update`);
  axios.patch(editUserRoute, userData)
    .then(res => {
      history.push({
        pathname: '/dashboard',
        state: { toast_message: 'User account information was successfully updated' }
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


/**
 * Login User and set JWT token or Send Errors to Component
 * @param {Object} userData 
 * @param {React Router History} history 
 */
export const loginUser = (userData) => dispatch => {
  const loginRoute = getCorrectPath('/api/users/login');
  axios.post(loginRoute, userData)
    .then(res => {
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    }
    )
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Set logged in user
export const setCurrentUser = decoded_data => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded_data
  };
};

// Logout user
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
