import axios from 'axios';
import { GET_ERRORS } from './types';
import { getCorrectPath } from '../util/developmentHelper';

/**
 * Create Roster and redirect to dashboard or send errors to component
 * @param {object} rosterData 
 * @param {React Router History} history 
 */
export const createRoster = (rosterData, history) => dispatch => {
  const createRosterRoute = getCorrectPath('/api/rosters/create');
  axios.post(createRosterRoute, rosterData)
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


/**
 * Delete Roster and redirect to dashboard or send errors to component
 * @param {object} deleteRosterData 
 * @param {React Router History} history 
 */
export const deleteRoster = (deleteRosterData, history) => dispatch => {
  const deleteRosterRoute = getCorrectPath(`/api/rosters/roster/${deleteRosterData.id}/delete-roster`);
  axios.patch(deleteRosterRoute, deleteRosterData)
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


/**
 * Edit Roster and redirect to roster page or send errors to component
 * @param {object} updatedRosterData 
 * @param {React Router History} history 
 */
export const editRoster = (updatedRosterData, history) => dispatch => {
  const editRosterRoute = getCorrectPath(`/api/rosters/roster/${updatedRosterData.id}/edit-roster`);
  axios.patch(editRosterRoute, updatedRosterData.data)
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


/**
 * Invites player to roster and redirects to roster page or sends errors to component
 * @param {object} rosterInviteData 
 * @param {React Router History} history 
 */
export const invitePlayerToRoster = (rosterInviteData, history) => dispatch => {
  const invitePlayerRoute = getCorrectPath(`/api/rosters/roster/${rosterInviteData.team_id}/invite`);
  axios.post(invitePlayerRoute, rosterInviteData.data)
    .then(res => {
      const path = `/roster/${rosterInviteData.team_id}`;
      history.push({
        pathname: path,
        state: { toast_message: `User ${rosterInviteData.data.invited_player} was successfully invited` }
      });
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


/**
 * Removes player from roster and redirects to roster page or sends errors to component
 * @param {object} rosterRemoveData 
 * @param {React Router History} history 
 */
export const kickPlayerFromRoster = (rosterRemoveData, history) => dispatch => {
  const kickPlayerRoute = getCorrectPath(`/api/rosters/roster/${rosterRemoveData.team_id}/remove`);
  axios.post(kickPlayerRoute, rosterRemoveData.data)
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


/**
 * Creates event for roster and redirects to roster page or sends errors to component
 * @param {object} createEventData 
 * @param {React Router History} history 
 */
export const createRosterEvent = (createEventData, history) => dispatch => {
  const createEventRoute = getCorrectPath(`/api/rosters/roster/${createEventData.team_id}/create-event`);
  axios.post(createEventRoute, createEventData.data)
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
