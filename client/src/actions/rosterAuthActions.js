import axios from 'axios';
import { GET_ERRORS } from './types';

// Create Roster
export const createRoster = (rosterData, history) => dispatch => {
  axios.post('/api/rosters/create', rosterData)
    .then(res => {
      history.push({
        pathname: '/dashboard',
        state: { toast_message: 'Roster was successfully created' }
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


// Delete Roster
export const deleteRoster = (deleteRosterData, history) => dispatch => {
  axios.patch('/api/rosters/roster/' + deleteRosterData.id + '/delete-roster', deleteRosterData)
    .then(res => {
      history.push({
        pathname: '/dashboard',
        state: { toast_message: 'Roster was successfully deleted' }
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


// Edit Roster
export const editRoster = (updatedRosterData, history) => dispatch => {
  axios.patch('/api/rosters/roster/' + updatedRosterData.id + '/edit-roster',
    updatedRosterData.data)
    .then(res => {
      const path = `/roster/${updatedRosterData.id}`;
      history.push({
        pathname: path,
        state: { toast_message: 'Roster info was successfully updated' }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}


// Invite Player to Roster
export const invitePlayerToRoster = (rosterInviteData, history) => dispatch => {
  axios.post('/api/rosters/roster/' + rosterInviteData.team_id + '/invite',
    rosterInviteData.data)
    .then(res => {
      const path = `/roster/${rosterInviteData.team_id}`;
      history.push({
        pathname: path,
        state: { toast_message: `User ${rosterInviteData.invited_player} was successfully invited` }
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


// Kick Player from Roster
export const kickPlayerFromRoster = (rosterRemoveData, history) => dispatch => {
  axios.post(`/api/rosters/roster/${rosterRemoveData.team_id}/remove`, rosterRemoveData.data)
    .then(res => {
      const path = `/roster/${rosterRemoveData.team_id}`;

      var conditional_toast_message;
      (rosterRemoveData.data.player_initiated) ? 
        conditional_toast_message = `You successfully left roster ${rosterRemoveData.team_id}`
      :
        conditional_toast_message = `User ${rosterRemoveData.data.username_to_remove} successfully kicked from roster`;

      history.push({
        pathname: path,
        state: { toast_message: conditional_toast_message }
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


// Create Event for this Roster
export const createRosterEvent = (createEventData, history) => dispatch => {
  axios.post('/api/rosters/roster/' + createEventData.team_id + '/create-event',
    createEventData.data)
    .then(res => {
      const path = `/roster/${createEventData.team_id}`;
      history.push({
        pathname: path,
        state: { toast_message: 'New roster event was successfully created' }
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
