const express = require("express");
const router = express.Router();
const axios = require("axios");

// Load input validation
//const validateRegisterInput = require("../../validation/register");
//const validateLoginInput = require("../../validation/login");
//const validateEditUserInput = require("../../validation/edituser")

// TODO - Create validation scripts for Roster forms {CreateRoster, EditRoster}

// Load mongoose Roster model
const Roster = require("../../models/RosterSchema");


// @route GET api/rosters/:teamname
// @desc Retrieves public info of single roster if found
// @access Public
router.get("/:teamname", (req, res) => {
    // Finds single roster with teamname and gives roster info in response
    Roster.findOne({ teamname: req.params.teamname })
        .then(roster => {
            if (!roster) {
                res.status(404).send('No roster found with this teamname');
            } else {
                res.json(roster);
            }
        })
        .catch(err => {
            console.log(err);
        });
});


// @route POST api/rosters/:id/add_player
// @desc Add player to "players" field of already established roster
// @access Public
router.post("/:teamname/add_player", (req, res) => {

    //Form validation
    /*const { errors, isValid } = validateEditUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }*/

    const filter = { teamname: req.params.teamname };
    const newPlayer = req.body;
    Roster.findOne(filter)
        .then(roster => {
            if (!roster) {
                res.status(404).send('Roster info not found for this teamname');
            } else {
                axios.get("localhost:5000/api/users/" + newPlayer.username)
                    .then(user => {
                        // User successfully found, add to roster and save to db
                        roster.players.push(newPlayer.id)
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


// @route POST api/rosters/create
// @desc Create team
// @access Public
router.post("/create", (req, res) => {

    //Form validation
    /*const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }*/

    Roster.findOne({ teamname: req.body.teamname })
        .then(roster => {
            if (roster) {
                return res.status(400).json({ teamname: "Teamname already exists" });
            } else {
                const newRoster = new Roster({
                    teamname: req.body.teamname,
                    leader: req.body.leader
                });
                newRoster.save()
                    .then(roster => res.json(roster))
                    .catch(err => console.log(err))
            }
    });
});


module.exports = router;