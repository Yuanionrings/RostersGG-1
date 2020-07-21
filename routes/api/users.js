const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/user/register");
const validateLoginInput = require("../../validation/user/login");
const validateEditUserInput = require("../../validation/user/edituser")

// Load mongoose User model
const User = require("../../models/UserSchema");


// @route GET api/users/user/:username
// @desc Retrieves public info of single user if found
// @access Public
router.get("/:username", (req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            if (!user) {
                res.status(404).send('No user found with this username');
            } else {
                res.json(user);
            }
        })
        .catch(err => {
            console.log(err);
        });
});


// @route PATCH api/users/user/:username/update
// @desc Update user information
// @access Public
router.patch("/:username/update", (req, res) => {

    //Form validation
    const { errors, isValid } = validateEditUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const filter = { username: req.params.username };
    const updatedInfo = req.body;
    User.findOneAndUpdate(filter, updatedInfo, { new: true }).then(user => {
        if (!user) {
            res.status(404).send('User info not found for this username');
        } else {
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
            } else {
                user.save().then(user => {
                    res.json('User information successfully updated')
                }).catch(err => {
                    console.log(err)
                    res.status(400).send('User information not successfully updated')
                });
            }
        }
    });
});


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {

    //Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            User.findOne({ username: req.body.username }).then(user => {
                if (user) {
                    return res.status(400).json({ username: "Username already exists" })
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
                            newUser
                                .save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                        });
                    });
                }
            })
        }
    });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {

    //Form Valdiation
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by Email
    User.findOne({ email }).then(user => {
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