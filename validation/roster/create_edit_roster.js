import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateCreateEditRosterInput(data) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.teamname = !isEmpty(data.teamname) ? data.teamname : "";
    data.team_desc = !isEmpty(data.team_desc) ? data.team_desc : "";

    //Team Name checks
    if (Validator.isEmpty(data.teamname)) {
        errors.teamname = "Team Name field is required";
    }
    if (!Validator.isLength(data.teamname, { min: 2, max: 16 })) {
        errors.password = "Team Description must be between 2 and 16 characters";
    }

    //Team Description checks
    if (Validator.isEmpty(data.team_desc)) {
        errors.team_desc = "Team Description field is required";
    }
    if (!Validator.isLength(data.team_desc, { min: 4, max: 60 })) {
        errors.password = "Team Description must be between 4 and 60 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
