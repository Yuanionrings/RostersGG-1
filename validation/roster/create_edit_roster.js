import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateCreateEditRosterInput(data) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.teamname = !isEmpty(data.teamname) ? data.teamname : "";
    data.team_desc = !isEmpty(data.team_desc) ? data.team_desc : "";
    data.game = !isEmpty(data.game) ? data.game : "";
    data.region = !isEmpty(data.region) ? data.region : "";

    // Team Name checks
    if (Validator.isEmpty(data.teamname)) {
        errors.teamname = "Team Name field is required";
    }
    if (!Validator.isLength(data.teamname, { min: 4, max: 32 })) {
        errors.teamname = "Team Name must be between 4 and 32 characters";
    }

    // Team Description checks
    if (Validator.isEmpty(data.team_desc)) {
        errors.team_desc = "Team Description field is required";
    }
    if (!Validator.isLength(data.team_desc, { min: 2, max: 100 })) {
        errors.team_desc = "Team Description must be between 2 and 100 characters";
    }

    // Game checks
    if (Validator.isEmpty(data.game)) {
        errors.game = "Game field is required";
    }
    if (Validator.equals(data.game, "no-game")) {
        errors.game = "A Game must be selected";
    }

    // Region checks
    if (Validator.isEmpty(data.region)) {
        errors.region = "Region field is required";
    }
    if (Validator.equals(data.region, "no-region")) {
        errors.region = "A Region must be selected";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
