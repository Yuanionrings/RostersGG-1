import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateEditUserInput(data) {

    let errors = {};

    if(data.password){
        //Password checks
        if (Validator.isEmpty(data.password)) {
            errors.password = "Password field is required";
        }
        if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = "Password must be between 6 and 30 characters";
        }
    }

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";

    //Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (!Validator.isLength(data.name, { min: 3, max: 14 })) {
        errors.password = "Display Name must be between 3 and 14 characters";
    }

    //Biography checks
    if (Validator.isEmpty(data.biography)) {
        errors.biography = "Biography cannot be blank";
    }

    //Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};