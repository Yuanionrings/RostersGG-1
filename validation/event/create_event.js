import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateCreateEventInput(data) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.when = !isEmpty(data.when) ? data.when : "";

    // Event Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Event Name field is required";
    }
    if (!Validator.isLength(data.name, { min: 4, max: 32 })) {
        errors.name = "Event Name must be between 4 and 32 characters";
    }

    // Event Date/Time checks
    if (Validator.isEmpty(data.when)) {
        errors.when = "Event Time and Date are required";
    }
    if (!Validator.isAfter(data.when)) {
        errors.when = "Event must take place in the future";
    }
    


    return {
        errors,
        isValid: isEmpty(errors)
    }
}
