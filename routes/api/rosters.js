const express = require("express");
const router = express.Router();

// Load input validation
//const validateRegisterInput = require("../../validation/register");
//const validateLoginInput = require("../../validation/login");
//const validateEditUserInput = require("../../validation/edituser")

// TODO - Create validation scripts for Roster forms {CreateRoster, EditRoster}

// Load mongoose Roster model
const Roster = require("../../models/RosterSchema");
// Load mongoose User model
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


// @route POST api/rosters/roster/:id/add
// @desc Add player to "players" field of already established roster
// @access Public
router.post("/roster/:id/add", (req, res) => {

    //Form validation
    /*const { errors, isValid } = validateEditUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }*/

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
                                res.json('Roster player successfully added')
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

// @route POST api/rosters/roster/:id/edit
// @desc Edit roster information
// @access Public
router.post("/roster/:id/edit", (req, res) => {
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
/*
req.body: {
    username: current user's username (add as roster.leader and to roster.players[])
    teamname: new team's display name
}
*/
router.post("/create", (req, res) => {

    //Form validation
    /*const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }*/
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