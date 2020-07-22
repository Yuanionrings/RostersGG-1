const express = require("express");
const router = express.Router();

// Load input validation
const validateCreateEditRosterInput = require("../../validation/roster/create_edit_roster");
const validateInvitePlayerToRosterInput = require("../../validation/roster/invite_player");

// Load mongoose Roster and User models
const Roster = require("../../models/RosterSchema");
const User = require("../../models/UserSchema");


// @route GET api/rosters/roster/:id
// @desc Retrieves public info of single roster if found
// @access Public
router.get("/roster/:id", (req, res) => {
    Roster.findOne({ _id: req.params.id })
        .then(roster => {
            if (!roster) {
                res.status(404).send('No roster found with this id');
            } else {
                res.json(roster);
            }
        })
        .catch(err => {
            console.log(err);
        });
});


// @route GET api/rosters/roster/:id/players
// @desc Retrieves user info of each player on roster's playerlist
// @access Public
router.get("/roster/:id/players", (req, res) => {
    Roster.findOne({ _id: req.params.id })
        .then(roster => {
            if (!roster) {
                res.status(404).send('No roster found with this id');
            } else {
                const player_usernames = roster.players;
                User.find({"username": {$in: player_usernames}})
                    .then(users => {
                        res.json(users)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => {
            console.log(err);
        });
});


// @route GET api/rosters/:username/rosters
// @desc Retrieves public info of every roster with user's username in players
// @access Public
router.get("/:username/rosters", (req, res) => {
    const userFilter = { username: req.params.username };
    User.findOne(userFilter)
        .then(user => {
            if (!user) {
                res.status(404).send('No user found with this username');
            } else {
                const rosterFilter = { players: user.username };
                Roster.find(rosterFilter)
                    .then(rosters => {
                        if (!rosters) {
                            res.status(404).send('No roster found with this teamname');
                        } else {
                            res.json(rosters);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
});


// @route POST api/rosters/roster/:id/invite
// @desc Sends invitation to user on platform to join team
// @access Public
router.post("/roster/:id/invite", (req, res) => {

    //Form validation
    const { errors, isValid } = validateInvitePlayerToRosterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const rosterFilter = { _id: req.params.id };
    const newUsernameToInvite = req.body.invited_player;

    Roster.findOne(rosterFilter)
        .then(roster => {
            if (!roster) {
                res.status(404).json({ other_error: "No roster found with this id" });
            } else {
                User.findOne({ username: newUsernameToInvite })
                    .then(user => {
                        user.invitations.push(req.params.id);
                        user.save()
                            .then(user => {
                                res.json('Player successfully invited')
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(404).json({ other_error: "Error sending invitation to user" })
                            });
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(404).json({ player_username: "No player found with this username" })
                    })
            }
    });
});


// @route PATCH api/rosters/roster/:id/decline_invite
// @desc Removes invitation from player's inbox
// @access Public
router.patch("/roster/:id/decline-invite", (req, res) => {
    const roster_id = req.params.id;
    const player_username = req.body.username;

    User.findOne({ username: player_username })
        .then(user => {
            user.invitations.pull(roster_id)
            user.save()
                .then(user => {
                    res.json("Invitation successfully declined and removed from inbox")
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send("Invitation not successfully declined")
                })
        })
        .catch(err => {
            console.log(err)
            res.status(404).send("Error finding user")
        })
});


// @route PATCH api/rosters/roster/:id/accept_invite
// @desc Add player to "players" field of already established roster IF accepted
// @access Public
router.patch("/roster/:id/accept-invite", (req, res) => {

    const rosterFilter = { _id: req.params.id };
    const newPlayer = req.body;

    Roster.findOne(rosterFilter)
        .then(roster => {
            if (!roster) {
                res.status(404).send('Roster info not found for this id');
            } else {
                User.findOne({ username: newPlayer.username })
                    .then(user => {
                        // User successfully found, add to roster and save to db
                        roster.players.push(user.username)
                        roster.save()
                            .then(roster => {
                                // Remove invitation from User, save user to db
                                user.invitations.pull(req.params.id)
                                user.save()
                                    .then(user => {
                                        res.json('User successfully added to roster')
                                    })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(400).send('Roster player not successfully added')
                            });
                        
                    })
                    .catch(err =>{
                        console.log(err)
                        res.status(404).send('User not found, cannot add to roster')
                    })
            }
    });
});


// @route PATCH api/rosters/roster/:id/edit
// @desc Edit roster information
// @access Public
router.patch("/roster/:id/edit", (req, res) => {

    //Form validation
    const { errors, isValid } = validateCreateEditRosterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Roster.findById(req.params.id)
        .then(roster => {
            if(!roster){
                res.status(404).send('Roster with this id not found')
            } else {
                roster.teamname = req.body.teamname;
                roster.team_desc = req.body.team_desc;

                roster.save()
                    .then(roster =>{
                        res.json('Roster information successfully updated')
                    })
                    .catch(err => {
                        res.status(400).send('Roster information not successfully updated')
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Roster update not successful')
        })
})


// @route POST api/rosters/create
// @desc Create team
// @access Public
router.post("/create", (req, res) => {

    //Form validation
    const { errors, isValid } = validateCreateEditRosterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const userFilter = { username: req.body.username };
    var username;
    User.findOne(userFilter)
        .then(user => {
            if (!user) {
                res.status(404).send('No user found with this username');
            } else {
                username = user.username;
                Roster.findOne({ teamname: req.body.teamname })
                    .then(roster => {
                        if (roster) {
                            return res.status(400).json({ teamname: "Teamname already exists" });
                        } else {
                            const newRoster = new Roster({
                                teamname: req.body.teamname,
                                team_desc: req.body.team_desc,
                                leader: username,
                                players: [username]
                            });
                            newRoster.save()
                                .then(roster => res.json(roster))
                                .catch(err => console.log(err))
                        }
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;