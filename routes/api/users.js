const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const sendEmail = require('../../email/email.send');
const msgs = require('../../email/email.msgs');
const templates = require('../../email/email.templates');


// Load input validation
const validateRegisterInput = require("../../validation/user/register");
const validateLoginInput = require("../../validation/user/login");
const validateEditUserInput = require("../../validation/user/edituser")

// Load mongoose User and Roster models
const User = require("../../models/UserSchema");
const Roster = require("../../models/RosterSchema");
const Event = require("../../models/EventSchema");


// @route GET api/users/user/:username
// @desc Retrieves info of single user
router.get("/:username", async (req, res) => {

    // Define filter for querying database
    const userFilter = { username: req.params.username };

    let errors = {};

    try {
        const user = await User.findOne(userFilter);
        if (!user) {
            errors.username = `No user found with the username: ${userFilter.username}`;
            res.status(404).json(errors);
            return;
        }
        res.json(user);

    } catch(error) {
        console.log(error);
        errors.badrequest = `Bad request, error finding user info for ${userFilter.username}`;
        res.status(400).json(errors);
    }
});


// TODO - COMPLETE THIS
router.get("/user-search", async (req, res) => {

    // Define query for user search
    const search_query = { $text : { $search : req.body.search }};

    console.log(req.body);

    try {
        const users = await User.find(search_query);
        if (!users) {
            res.status(400).send("Error finding Users");
        } else if (users.length > 1) {
            res.status(404).send("Could not find any users with this search");
        }

        console.log(users);
        res.json(users);
    } catch(error) {
        console.log(error);
        res.status(400).send("Error when finding users");
    }
});


// @route GET api/users/:username/invitations
// @desc Retrieves roster info of each invitation on user's invitation list
router.get("/:username/invitations", async (req, res) => {

    // Define filter for querying users collection
    const userFilter = { username: req.params.username };

    let errors = {};

    try {
        const user = await User.findOne(userFilter);
        if (!user) {
            errors.username = `No user found with the username: ${userFilter.username}`;
            res.status(404).json(errors);
        }

        // Define filter for querying rosters collection
        const rosterFilter = { "_id" : {$in: user.invitations}};

        const rosters = await Roster.find(rosterFilter);
        res.json(rosters);

    } catch(error) {
        console.log(error);
        errors.badrequest = `Bad request, could not find invitation info for ${userFilter.username}`;
        res.status(400).json(errors);
    }
});


// @route GET api/users/:username/upcoming-events
// @desc Retrieves event info for all of a user's upcoming events
/*
    Check to see if user exists
    Get list of all rosters that player is on
    Get list of events of each roster
*/
router.get("/:username/upcoming-events", async (req, res) => {

    // Define filter for querying users collection
    const userFilter = { username: req.params.username };

    let res_errors = {};

    try {
        const user = await User.findOne(userFilter);
        if (!user) {
            res_errors.upcoming_events = `No user found with username ${userFilter.username}`;
            res.status(404).json(res_errors);
            return;
        }

        const rosterFilter = { players: user.username };
        const rosterProjection = {_id:1};
        const rosters = await Roster.find(rosterFilter, rosterProjection);
        console.log(rosters);

        if (!rosters || rosters.length < 1){
            res_errors.upcoming_events = `User is not on any rosters, so no events`;
            res.status(404).json(res_errors);
            return;
        }

        // List of roster documents found -> extract _ids into list
        var rosters_id_list = [];
        var roster_doc;
        for(roster_doc of rosters){
            rosters_id_list.push(roster_doc._id);
        }
        console.log(rosters_id_list);

        const eventFilter = {teams: { $elemMatch: {$in: roster_list }}};
        console.log(eventFilter)
        const events = await Event.find(eventFilter);
        console.log(events)

        res.json(events);

    } catch(error) {
        console.log(error)
    }
});


// @route PATCH api/users/user/:username/update
// @desc Update user information
router.patch("/:username/update", async (req, res) => {

    // Form validation to ensure no fields are empty
    const { errors, isValid } = validateEditUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Define filter for querying users collection
    const userFilter = { username: req.params.username };
    const updatedInfo = req.body;

    let res_errors = {};
    let res_success = {};

    try {
        const user = await User.findOneAndUpdate(userFilter, updatedInfo, { new: true });
        if (!user) {
            res_errors.username = `No user found with the username: ${userFilter.username}`;
            res.status(404).json(res_errors);
        } 

        if (updatedInfo.password) {
            // Hash password before storing in database
            const rounds = 10;
            bcrypt.genSalt(rounds, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(user => {
                            res_success.success = `User (${user.username}) info/password updated successfully`;
                            res.json(res_success);
                        })
                        .catch(err => {
                            console.log(err);
                            res_errors.badrequest = `User information not successfully updated`;
                            res.status(400).json(res_errors);
                        });
                });
            });
        }

        const updatedUser = await user.save();
        res_success.success = `User (${updatedUser.username}) info updated successfully`;
        res.json(res_success);

    } catch(error) {
        console.log(err);
        res_errors.badrequest = `User information not successfully updated`;
        res.status(400).json(res_errors);
    }
});


// @route POST api/users/register
// @desc Register user
router.post("/register", async (req, res) => {

    // Form validation to ensure no fields are empty and that passwords match
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Define filters to query database
    const userEmailFilter = { email: req.body.email };
    const usernameFilter = { username: req.body.username };

    let res_errors = {};
    let res_success = {};
    
    try {
        const user = await User.findOne(userEmailFilter);
        if (user && !user.confirmed) {
            res_errors.email = msgs.confirm;
            res.status(400).json(res_errors);
            return;

        } else if (user && user.confirmed) {
            res_errors.email = msgs.alreadyConfirmed;
            res.status(400).json(res_errors);
            return;
        }

        const user2 = await User.findOne(usernameFilter);
        if (user2) {
            res_errors.username = `Username ${user2.username} already exists - must be unique`;
            res.status(400).json(res_errors);
            return;
        }

        var newUser;

        // This makes the User document already confirmed if in development (doesn't send email)
        if(process.env.NODE_ENV === 'development'){
            console.log("[SERVER] In development environment, not sending confirmation email")
            newUser = new User({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                confirmed: true
            });
        } else {
            newUser = new User({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });
        }

        // Hash password before storing in database
        const rounds = 10;
        bcrypt.genSalt(rounds, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(newUser => {
                        // User created, send verification email if not already confirmed
                        if(!newUser.confirmed) { 
                            sendEmail(newUser.email, templates.confirm(newUser._id));
                        }
                        res.json(newUser);
                    })
                    .catch(err => {
                        console.log(err);
                        res_errors.username = `Username cannot contain spaces, underscores, or other special characters`;
                        res.status(400).json(res_errors);
                        return;
                    });
            });
        });

    } catch(error) {
        console.log(error);
        res_errors.badrequest = `Error when registering user, email contact@rosters.gg`;
        res.status(400).json(res_errors);
    }
});


// @route POST api/users/confirm-email
// @desc Confirms email and activates user account
router.post("/confirm-email/:id", async (req, res) => {

    // Define filters to query database
    const userIdFilter = req.params.id;
    
    try {
        const user = await User.findById(userIdFilter);
        if (!user) {
            return res.status(400).json({ msg: msgs.couldNotFind });

        } else if (user && !user.confirmed) {
            User.findByIdAndUpdate(userIdFilter, {confirmed: true})
                .then(() => res.json({ msg: msgs.confirmed }))
                .catch(err => console.log(err));

        } else {
            res.json({ msg: msgs.alreadyConfirmed });
        }


    } catch(error) {
        console.log(error);
    }
});


// @route POST api/users/login
// @desc Login user and return JWT token
router.post("/login", (req, res) => {

    // Form validation to ensure email and password are entered
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Define filter for querying database
    const userFilter = { email: req.body.email};
    const password = req.body.password;

    let res_errors = {};

    User.findOne(userFilter).then(user => {
        if (!user) {
            res_errors.email = `Email ${userFilter.email} not found`;
            res.status(404).json(res_errors);
            return;

        } else if (user && !user.confirmed) {
            res_errors.email = `User with ${userFilter.email} must be confirmed, check email`;
            res.status(403).json(res_errors);
            return;
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    username: user.username
                };

                // Sign token
                jwt.sign(payload,
                    keys.secretOrKey,
                    { expiresIn: 31556926 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
                
            } else {
                res_errors.passwordincorrect = `Password incorrect`;
                res.status(400).json(res_errors);
                return;
            }
        });
    });
});

module.exports = router;