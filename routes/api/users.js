const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/user/register");
const validateLoginInput = require("../../validation/user/login");
const validateEditUserInput = require("../../validation/user/edituser")

// Load mongoose User and Roster models
const User = require("../../models/UserSchema");
const Roster = require("../../models/RosterSchema");


// @route GET api/users/user/:username
// @desc Retrieves info of single user
router.get("/:username", async (req, res) => {

    // Define filter for querying database
    const userFilter = { username: req.params.username };

    try {
        const user = await User.findOne(userFilter);
        if (!user) {
            res.status(404).send('No user found with this username');
        }

        res.json(user);

    } catch(error) {
        console.log(error);
        res.status(400).send('Bad request, error finding user info');
    }
});


// @route GET api/users/:username/invitations
// @desc Retrieves roster info of each invitation on user's invitation list
router.get("/:username/invitations", async (req, res) => {

    // Define filter for querying users collection
    const userFilter = { username: req.params.username };

    try {
        const user = await User.findOne(userFilter);
        if (!user) {
            res.status(404).send('No user found with this username');
        }

        const rosterFilter = { "_id" : {$in: user.invitations}};

        const rosters = await Roster.find(rosterFilter);
        res.json(rosters);

    } catch(error) {
        console.log(error);
        res.status(400).send('Bad request, error finding user invitation info');
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

    const userFilter = { username: req.params.username };
    const updatedInfo = req.body;

    try {
        const user = await User.findOneAndUpdate(userFilter, updatedInfo, { new: true });
        if (!user) {
            res.status(404).send('User info not found for this username');
        } 

        if (updatedInfo.password) {
            // Hash password before storing in database
            const rounds = 10;
            bcrypt.genSalt(rounds, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(user => res.json('User information/password successfully updated'))
                        .catch(err => res.status(400).send('User information/password not successfully updated'));
                });
            });
        }

        const updated_user = await user.save();
        console.log(updated_user);
        res.json('User information successfully updated');

    } catch(error) {
        console.log(err);
        res.status(400).send('User information not successfully updated');
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
    
    try {
        const user = await User.findOne(userEmailFilter);
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        }

        const user2 = await User.findOne(usernameFilter);
        if (user2) {
            return res.status(400).json({ username: "Username already exists, it must be unique" });
        }

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        // Hash password before storing in database
        const rounds = 10;
        bcrypt.genSalt(rounds, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });

    } catch(error) {
        console.log(error);
        res.status(400).json({ other_error: "Error creating new user" });
    }

    /*
    User.findOne(userEmailFilter)
        .then(user => {
            if (user) {
                return res.status(400).json({ email: "Email already exists" });
            } else {
                User.findOne(usernameFilter)
                    .then(user => {
                        if (user) {
                            return res.status(400).json({ username: "Username already exists, it must be unique" });
                        } else {
                            const newUser = new User({
                                name: req.body.name,
                                username: req.body.username,
                                password: req.body.password,
                                email: req.body.email
                            });

                            // Hash password before storing in database
                            const rounds = 10;
                            bcrypt.genSalt(rounds, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    newUser.password = hash;
                                    newUser.save()
                                        .then(user => res.json(user))
                                        .catch(err => console.log(err));
                                });
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
        }); */
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

    User.findOne(userFilter).then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
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
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;