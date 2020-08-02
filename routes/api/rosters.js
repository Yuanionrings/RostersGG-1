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
router.get("/roster/:id", async (req, res) => {

    // Define filters for querying database
    const rosterFilter = { _id: req.params.id };

    try{
        const roster = await Roster.findOne(rosterFilter);

        if (!roster) {
            res.status(404).send('No roster found with this id');
        } else {
            res.json(roster);
        }
    } catch(error) {
        console.log(error);
        res.status(400).send('Bad request, make sure id is correct')
    }
});


// @route GET api/rosters/roster/:id/players
// @desc Retrieves user info of each player on roster's playerlist
router.get("/roster/:id/players", async (req, res) => {

    // Define filter for querying rosters collection
    const rosterFilter = { _id: req.params.id };

    try{
        const roster = await Roster.findOne(rosterFilter);
        if (!roster) {
            res.status(404).send('No roster found with this id');
        }

        // Define filter for querying users collection
        const userFilter = {"username": {$in: roster.players}}
        const users = await User.find(userFilter);
        if (!users) {
            res.status(404).send('No players found in this roster')
        }
        res.json(users);

    } catch(error) {
        console.log(error)
        res.status(400).send('Bad request, please check filters')
    }
});


// @route GET api/rosters/:username/rosters
// @desc Retrieves public info of every roster with user's username in players field
router.get("/:username/rosters", (req, res) => {

    // Define filter for querying users collection
    const userFilter = { username: req.params.username };

    User.findOne(userFilter)
        .then(user => {
            if (!user) {
                res.status(404).send('No user found with this username');
            } else {

                // Define filter for querying rosters collection
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


// @route GET api/rosters/:username/led-rosters
// @desc Retrieves public info of every roster with user's username in leader field
router.get("/:username/led-rosters", (req, res) => {

    // Define filter for querying users collection
    const userFilter = { username: req.params.username };

    User.findOne(userFilter)
        .then(user => {
            if (!user) {
                res.status(404).send('No user found with this username');
            } else {

                // Define filter for querying rosters collection
                const rosterFilter = { leader: user.username };
                Roster.find(rosterFilter)
                    .then(rosters => {
                        if (!rosters) {
                            res.status(404).send('No roster found with this username as leader');
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

// @route GET api/rosters/roster-search
// @desc Searches for teams based on text search query
router.get("/roster-search", async (req, res) => {
    
    // Define search query before finding Rosters 
    const search_query = { $text : { $search : req.body.search }};
    console.log(req.body);
    try {
        const rosters = await Roster.find(search_query);
        if (!rosters) {
            res.status(404).send({errors: {search: "There are no rosters found with this search"}});
        }

        console.log(rosters)
        res.json(rosters);
    } catch(error) {
        console.log(error);
        res.status(400).send({errors: {other_error: "Error finding rosters"}});
    }
});

// @route POST api/rosters/roster/:id/invite
// @desc Sends invitation to user on platform to join team
router.post("/roster/:id/invite", async (req, res) => {

    // Form validation to ensure user enters a username to invite to roster
    const { errors, isValid } = validateInvitePlayerToRosterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Define filters for querying collections
    const rosterFilter = { _id: req.params.id };
    const userFilter = { username: req.body.invited_player };

    try{
        const roster = await Roster.findOne(rosterFilter);
        if (!roster) {
            res.status(404).json({ other_error: "No roster found with this id" });
        }

        const user = await User.findOne(userFilter);
        if (!user) {
            const errors = {
                player_username: 'No user found with this username'
            }
            res.status(404).send(errors);
        }

        user.invitations.push(req.params.id);
        const saved_user = await user.save();
        console.log(saved_user);
        res.json('Player successfully invited');

    } catch(error) {
        console.log(error);
        res.status(400).send('Bad request, could not invite player')
    }
});


// @route PATCH api/rosters/roster/:id/decline_invite
// @desc Removes invitation from player's inbox and does not add to roster
router.patch("/roster/:id/decline-invite", async (req, res) => {

    // Define filters for querying database
    const userFilter = { username: req.body.username };
    const roster_id = req.params.id;

    try {
        const user = await User.findOne(userFilter);
        if (!user) {
            res.status(404).json({ player_username: "No player found with this username" });
        }

        user.invitations.pull(roster_id);
        const saved_user = await user.save();
        console.log(saved_user);
        res.json("Invitation successfully declined and removed from inbox");

    } catch(error) {
        console.log(error);
        res.status(400).json({ other_error: "Bad request, error declining invitation" });
    }
});


// @route PATCH api/rosters/roster/:id/accept_invite
// @desc Add player to players field of already established roster
router.patch("/roster/:id/accept-invite", async (req, res) => {

    // Define filters for querying database
    const rosterFilter = { _id: req.params.id };
    const userFilter = { username: req.body.username };

    try {
        const roster = await Roster.findOne(rosterFilter);
        if (!roster) {
            res.status(404).send('Roster info not found for this id');
        }

        const user = await User.findOne(userFilter);
        if (!user) {
            res.status(404).send('User info not found cannot add to roster');
        }
        /*else if (roster.players.indexOf(user.username) > -1) {
            user.invitations.pull(req.params.id);
            const updated_user = await user.save();
            console.log(updated_user);
            res.status(400).send('Bad request, user already on this roster');
        }*/

        roster.players.push(user.username);
        const updated_roster = await roster.save();
        console.log(updated_roster);

        user.invitations.pull(req.params.id);
        const updated_user = await user.save();
        console.log(updated_user);

        res.json('User successfully added to roster');

    } catch(error) {
        console.log(error);
        res.status(400).send('Bad request, error accepting invite');
    }
});


// @route PATCH api/rosters/roster/:id/edit
// @desc Edit roster information and save to database
router.patch("/roster/:id/edit", async (req, res) => {

    // Form validation to ensure teamname nor team_desc were removed
    const { errors, isValid } = validateCreateEditRosterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {
        const roster = await Roster.findById(req.params.id);
        if(!roster){
            res.status(404).send('Roster with this id not found')
        }

        roster.teamname = req.body.teamname;
        roster.team_desc = req.body.team_desc;

        const updated_roster = await roster.save();
        console.log(updated_roster);
        res.json('Roster information updated successfully');

    } catch(error) {
        console.log(error);
        res.status(400).send('Bad request, error updating roster information');
    }
})


// @route POST api/rosters/create
// @desc Create's a roster with name and description from request and adds
//       the current user to leader field and players list
router.post("/create", async (req, res) => {

    // Form validation to ensure teamname and team_desc are properly entered
    const { errors, isValid } = validateCreateEditRosterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Define filter for querying collections
    const userFilter = { username: req.body.username };

    try {
        const user = await User.findOne(userFilter);
        if (!user) {
            const errors = {
                player_username: 'No user found with this username'
            }
            res.status(404).send(errors);
        } 

        const newRoster = new Roster({
            teamname: req.body.teamname,
            team_desc: req.body.team_desc,
            leader: user.username,
            game: req.body.game,
            region: req.body.region,
            players: [user.username]
        });

        const new_roster = await newRoster.save();
        console.log(new_roster);
        res.json(new_roster);

    } catch(error) {
        console.log(error);
        res.status(400).send({error: 'Bad request, error creating roster'});
    }
});

module.exports = router;