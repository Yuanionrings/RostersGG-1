import axios from "axios";
import { GET_ERRORS } from "./types";

// Register Roster
export const createRoster = (rosterData, history) => dispatch => {
  console.log(rosterData)
  axios.post("http://localhost:5000/api/rosters/create", rosterData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Edit Roster
export const editRoster = (updatedRosterData, history) => dispatch => {
  axios.patch('http://localhost:5000/api/rosters/roster/' + updatedRosterData.id + '/edit',
    updatedRosterData.data)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Invite Player to Roster
export const invitePlayerToRoster = (rosterInviteData, history) => dispatch => {
  axios.post('http://localhost:5000/api/rosters/roster/' + rosterInviteData.team_id + '/invite',
    rosterInviteData.data)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
