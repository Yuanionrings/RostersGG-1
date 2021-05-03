import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateInvitePlayerToRosterInput(data) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.invited_player = !isEmpty(data.invited_player) ? data.invited_player : "";

    //Username checks
    if (Validator.isEmpty(data.invited_player)) {
        errors.player_username = "Username is required to invite player";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
