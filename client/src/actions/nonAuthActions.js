import axios from 'axios';
import { getCorrectPath } from '../util/developmentHelper';

export function invitePlayerToRoster(team_id, username_to_invite, history) {
    const rosterInviteData = {
        invited_player: username_to_invite
    };
    const invitePlayerRoute = getCorrectPath(`/api/rosters/roster/${team_id}/invite`);
    axios.post(invitePlayerRoute, rosterInviteData)
      .then(res => {
        const path = `/roster/${team_id}`;
        history.push({
          pathname: path,
          state: { toast_message: `User ${username_to_invite} was successfully invited` }
        });
      })
      .catch(err => {
        console.log(err)
      })
}