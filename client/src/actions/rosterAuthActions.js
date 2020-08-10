import axios from "axios";
import { GET_ERRORS } from "./types";

// Create Roster
export const createRoster = (rosterData, history) => dispatch => {
  axios.post("/api/rosters/create", rosterData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Delete Roster
export const deleteRoster = (deleteRosterData, history) => dispatch => {
  axios.delete('/api/rosters/' + deleteRosterData.id + '/delete', deleteRosterData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Edit Roster
export const editRoster = (updatedRosterData, history) => dispatch => {
  axios.patch('/api/rosters/roster/' + updatedRosterData.id + '/edit',
    updatedRosterData.data)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Invite Player to Roster
export const invitePlayerToRoster = (rosterInviteData, history) => dispatch => {
  axios.post('/api/rosters/roster/' + rosterInviteData.team_id + '/invite',
    rosterInviteData.data)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
