const express = require('express');
const router = express.Router();

const sendEmail = require('../../email/email.send');
const msgs = require('../../email/email.msgs');
const templates = require('../../email/email.templates');

// Load input validation
const validateCreateEditRosterInput = require('../../validation/roster/create_edit_roster');
const validateInvitePlayerToRosterInput = require('../../validation/roster/invite_player');
const validateCreateEventInput = require('../../validation/event/create_event');

// Load mongoose Roster and User models
const Roster = require('../../models/RosterSchema');
const User = require('../../models/UserSchema');
const Event = require('../../models/EventSchema');


// @route GET api/rosters/roster/:id
// @desc Retrieves public info of single roster if found
router.get('/roster/:id', async (req, res) => {

    // Define filters for querying database
    const rosterFilter = { _id: req.params.id };

    let res_errors = {};

    try{
        const roster = await Roster.findOne(rosterFilter);
        if (!roster) {
            res_errors.id = 'No roster found with this id';
            res.status(404).json(res_errors);
            return;
        }
        res.json(roster);
        
    } catch(error) {
        console.log(error);
        res_errors.badrequest = 'Bad request, this may require more debugging';
        res.status(400).json(res_error);
    }
});


// @route GET api/rosters/roster/:id/players
// @desc Retrieves user info of each player on roster's playerlist
router.get('/roster/:id/players', async (req, res) => {

    // Define filter for querying rosters collection
    const rosterFilter = { _id: req.params.id };

    let res_errors = {};

    try{
        const roster = await Roster.findOne(rosterFilter);
        if (!roster) {
            res_errors.id = 'No roster found with this id';
            res.status(404).json(res_errors);
            return;
        }

        // Define filter for querying users collection
        const userFilter = { 'username': { $in: roster.players }};
        const users = await User.find(userFilter);
        if (!users) {
            res_errors.players = 'No players found on this roster';
            res.status(404).json(res_errors);
            return;
        }
        res.json(users);

    } catch(error) {
        console.log(error)
        res_errors.badrequest = 'Bad request, needs more debugging';
        res.status(400).json(res_errors);
    }
});


// @route GET api/rosters/:username/rosters
// @desc Retrieves public info of every roster with user's username in players field
router.get('/:username/rosters', (req, res) => {

    // Define filter for querying users collection
    const userFilter = { username: req.params.username };

    let res_errors = {};

    User.findOne(userFilter)
        .then(user => {
            if (!user) {
                res_errors.username = `No user found with username ${userFilter.username}`;
                res.status(404).json(res_errors);

            } else {
                // Define filter for querying rosters collection
                const rosterFilter = { players: user.username };

                Roster.find(rosterFilter)
                    .then(rosters => {
                        if (!rosters) {
                            res_errors.username = `No rosters found with player ${userFilter.username}`
                            res.status(404).json(res_errors);
                        }

                        res.json(rosters);
                        
                    })
                    .catch(err => {
                        console.log(err);
                        res_errors.badrequest = `Error finding rosters`;
                        res.status(400).json(res_errors);
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res_errors.badrequest = `Error finding rosters`;
            res.status(400).json(res_errors);
        });
});


// @route GET api/rosters/:username/led-rosters
// @desc Retrieves public info of every roster with user's username in leader field
router.get('/:username/led-rosters', (req, res) => {

    // Define filter for querying users collection
    const userFilter = { username: req.params.username };

    let res_errors = {};

    User.findOne(userFilter)
        .then(user => {
            if (!user) {
                res_errors.username = `No user found with username ${userFilter.username}`;
                res.status(404).json(res_errors);

            } else {
                // Define filter for querying rosters collection
                const rosterFilter = { leader: user.username };
                Roster.find(rosterFilter)
                    .then(rosters => {
                        if (!rosters) {
                            res_errors.username = `No rosters found with leader ${userFilter.username}`;
                            res.status(400).json(res_errors);

                        } else {
                            res.json(rosters);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res_errors.badrequest = `Error finding rosters`;
                        res.status(400).json(res_errors);
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res_errors.badrequest = `Error finding rosters`;
            res.status(400).json(res_errors);
        });
});

// @route POST api/rosters/roster-search
// @desc Uses text index to find rosters
router.post('/roster-search', async (req, res) => {

    let errors = {};

    // Define query for user search
    if(req.body.roster_search == null) {
        errors.badrequest = `Bad request, roster_search query is null`;
        res.status(400).json(errors);
    }
    var searchQuery;
    const searchProjection = { teamname: 1, _id: 1, region: 1, game: 1 };

    if(!req.body.game_search && !req.body.region_search) {
        searchQuery = { $text : { $search : req.body.roster_search }};

    } else if(req.body.game_search && !req.body.region_search) {
        searchQuery = { $text : { $search : req.body.roster_search }, 
                        game: req.body.game_search };

    } else if(!req.body.game_search && req.body.region_search) {
        searchQuery = { $text : { $search : req.body.roster_search }, 
                        region: req.body.region_search };

    } else {
        searchQuery = { $text : { $search : req.body.roster_search }, 
                        region: req.body.region_search,
                        game: req.body.game_search };
    }

    try {
        const rosters = await Roster.find(searchQuery, searchProjection);
        if (!rosters) {
            errors.name = `Error finding any rosters for search ${req.body.roster_search}`;
            res.status(404).json(errors);
            return;

        } else if (rosters.length < 1) {
            errors.name = `Found 0 rosters for search ${req.body.roster_search}`;
            res.status(404).json(errors);
            return;
        }

        res.json(rosters);

    } catch(error) {
        errors.badrequest = error;
        res.status(400).json(errors);
        return;
    }
});

// @route POST api/rosters/roster/:id/invite
// @desc Sends invitation to user on platform to join team
router.post('/roster/:id/invite', async (req, res) => {

    // Form validation to ensure user enters a username to invite to roster
    const { errors, isValid } = validateInvitePlayerToRosterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Define filters for querying collections
    const rosterFilter = { _id: req.params.id };
    const userFilter = { username: req.body.invited_player };

    let res_errors = {};
    let res_success = {};

    try{
        const roster = await Roster.findOne(rosterFilter);
        if (!roster) {
            res_errors.id = 'No roster found with this id';
            res.status(404).json(res_errors);
            return;
        }

        const user = await User.findOne(userFilter);
        if (!user) {
            res_errors.player_username = 'No user found with this username';
            res.status(404).json(res_errors);
            return;

        } else if (roster.players.includes(user.username)) {
            res_errors.player_username = 'This player is already on this roster';
            res.status(400).json(res_errors);
            return;

        } else if (user.invitations.includes(roster._id)) {
            res_errors.player_username = 'This player already has an invite from this roster';
            res.status(400).json(res_errors);
            return;
        }

        user.invitations.push(req.params.id);
        const invitedUser = await user.save();

        if(process.env.NODE_ENV === 'production') {
            try {
                sendEmail(user.email, templates.new_invitation())
            } catch(err) {
                console.log(err);
            }
        } else {
            console.log(`[SERVER] Not sending email on invitation, NODE_ENV=${process.env.NODE_ENV}`)
        }
        res_success.success = `User ${invitedUser.username} successfully invited`;
        res.json(res_success);

    } catch(error) {
        console.log(err);
        res_errors.badrequest = `Error inviting user to this roster`;
        res.status(400).json(res_errors);
    }
});


// @route PATCH api/rosters/roster/:id/remove
// @desc Removes player from roster if found - cannot remove leaders
router.patch('/roster/:id/remove', async (req, res) => {

    // Define filters for querying collections
    const rosterFilter = { _id: req.params.id };
    const userFilter = { username: req.body.username_to_remove };

    // This tell us if player initiated (voluntary leave) or leader initiated (kicked)
    const playerInitiated = req.body.player_initiated;

    let res_errors = {};
    let res_success = {};

    try{
        const roster = await Roster.findOne(rosterFilter);
        if (!roster) {
            res_errors.remove = 'No roster found with this id';
            res.status(404).json(res_errors);
            return;
        }

        const user = await User.findOne(userFilter);
        if (!user) {
            res_errors.remove = 'No user found with this username';
            res.status(404).json(res_errors);
            return;

        } else if (!roster.players.includes(user.username)) {
            res_errors.remove = 'This player is not on this roster, cannot remove from roster';
            res.status(400).json(res_errors);
            return;

        } else if (roster.leader === user.username) {
            res_errors.remove = 'This player is the team leader, cannot remove from roster';
            res.status(403).json(res_errors);
            return;
        }

        roster.players.pull(user.username);
        const updatedRoster = await roster.save();

        res_success.success = `User ${user.username} successfully removed from roster ${updatedRoster._id}`;
        res.json(res_success);

    } catch(error) {
        console.log(err);
        res_errors.remove = `Error removing user from this roster. If error persists, email contact@rosters.gg`;
        res.status(400).json(res_errors);
    }
});


// @route PATCH api/rosters/roster/:id/decline_invite
// @desc Removes invitation from player's inbox and does not add to roster
router.patch('/roster/:id/decline-invite', async (req, res) => {

    // Define filters for querying database
    const userFilter = { username: req.body.username };
    const roster_id = req.params.id;

    try {
        const user = await User.findOne(userFilter);
        if (!user) {
            res.status(404).json({ player_username: 'No player found with this username' });
        }

        user.invitations.pull(roster_id);
        await user.save();
        res.json('Invitation successfully declined and removed from inbox');

    } catch(error) {
        console.log(error);
        res.status(400).json({ other_error: 'Bad request, error declining invitation' });
    }
});


// @route PATCH api/rosters/roster/:id/accept_invite
// @desc Add player to players field of already established roster
router.patch('/roster/:id/accept-invite', async (req, res) => {

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

        roster.players.push(user.username);
        await roster.save();

        user.invitations.pull(req.params.id);
        await user.save();

        res.json('User successfully added to roster');

    } catch(error) {
        console.log(error);
        res.status(400).send('Bad request, error accepting invite');
    }
});


// @route PATCH api/rosters/roster/:id/edit
// @desc Edit roster information and save to database
router.patch('/roster/:id/edit-roster', async (req, res) => {

    // Form validation to ensure teamname nor team_desc were removed
    const { errors, isValid } = validateCreateEditRosterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    let res_errors = {};
    let res_success = {};

    try {
        const roster = await Roster.findById(req.params.id);
        if(!roster){
            res_errors.id = 'Roster with this id not found, cannot proceed';
            res.status(404).json(res_errors);
        }

        roster.teamname = req.body.teamname;
        roster.team_desc = req.body.team_desc;
        roster.game = req.body.game;
        roster.region = req.body.region;

        const updatedRoster = await roster.save();
        res_success.success = `Roster ${updatedRoster.teamname} successfully updated`;
        res.json(res_success);

    } catch(err) {
        console.log(err);
        res_errors.badrequest = `Error inviting user to this roster`;
        res.status(400).json(res_errors);
    }
});


// @route PATCH api/rosters/roster/:id/delete
// @desc Completely deletes the listed roster and all associated events
router.patch('/roster/:id/delete-roster', async (req, res) => {

    // Define filters for querying collections
    const rosterFilter = { _id: req.params.id };
    const userFilter = { username: req.body.username };

    let res_errors = {};
    let res_success = {};

    try{
        const roster = await Roster.findOne(rosterFilter);
        if (!roster) {
            res_errors.delete = 'No roster found with this id';
            res.status(404).json(res_errors);
            return;
        }

        const user = await User.findOne(userFilter);
        if (!user) {
            res_errors.delete = 'No user found with this username';
            res.status(404).json(res_errors);
            return;

        } else if (!roster.players.includes(user.username)) {
            res_errors.delete = 'This player is not on this roster, cannot delete';
            res.status(400).json(res_errors);
            return;
         
        } else if (roster.leader != user.username) {
            res_errors.delete = 'This player is not the team leader, cannot delete roster';
            res.status(403).json(res_errors);
            return;
        }


        var roster_id_list = [roster._id];
        const eventFilter = {team_ids: { $elemMatch: {$in: roster_id_list }}};
        const deleted = await Event.deleteMany(eventFilter);
        console.log(`Found ${deleted.n} events associated with roster ${roster._id} and deleted ${deleted.deletedCount}`);

        await Roster.findByIdAndDelete(rosterFilter);
        res_success.success = `Roster ${rosterFilter._id} successfully deleted`;
        res.json(res_success);

    } catch(error) {
        console.log(err);
        res_errors.delete = `Error deleting this roster`;
        res.status(400).json(res_errors);
    }
});


// @route POST api/rosters/create
// @desc Create's a roster with name and description from request and adds
//       the current user to leader field and players list
router.post('/create', async (req, res) => {

    // Form validation to ensure teamname and team_desc are properly entered
    const { errors, isValid } = validateCreateEditRosterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Define filter for querying collections
    const userFilter = { username: req.body.username };

    let res_errors = {};
    let res_success = {};

    try {
        const user = await User.findOne(userFilter);
        if (!user) {
            res_errors.player_username = `No user found with the username ${userFilter.username}`;
            res.status(404).json(res_errors);
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
        res_success.success = `Roster ${new_roster.teamname} successfully created`;
        res.json(res_success);

    } catch(error) {
        console.log(error);
        res_errors.badrequest = `Error creating roster`;
        res.status(400).json(res_errors);
    }
});


// @route POST api/rosters/roster/:id/create-event
// @desc Create's a new private event for the roster with :id
router.post('/roster/:id/create-event', async (req, res) => {

    // Form validation to ensure event name and date are properly entered
    const { errors, isValid } = validateCreateEventInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Define filters for querying collections
    const rosterFilter = { _id: req.params.id };
    const userFilter = { username: req.body.username };

    let res_errors = {};
    let res_success = {};

    try {
        // Ensure roster with this id exists
        const roster = await Roster.findOne(rosterFilter);
        if (!roster) {
            res_errors.create_event = 'No roster found with this id';
            res.status(404).json(res_errors);
            return;
        }
        // Ensure user who initiated exists and is leader
        const user = await User.findOne(userFilter);
        if (!user) {
            res_errors.create_event = 'User not found, cannot create event';
            res.status(404).json(res_errors);
            return;

        } else if (roster.leader !== user.username) {
            res_errors.create_event = 'User is not team leader, cannot create event';
            res.status(403).json(res_errors);
            return;
        }

        const newEvent = (req.body.description) ? 
            new Event({
                name: req.body.name,
                description: req.body.description,
                when: req.body.when,
                team_ids: [req.body.team_id],
                team_names: [roster.teamname]
            })
            :
            new Event({
                name: req.body.name,
                when: req.body.when,
                team_ids: [req.body.team_id],
                team_names: [roster.teamname]
            });

        const new_event = await newEvent.save();
        
        res_success.success = `Event ${new_event._id} successfully created`;
        res.json(res_success);

    } catch(error) {
        console.log(error);
        res_errors.when = `Date and Time likely not entered correctly`;
        res.status(400).json(res_errors);
    }
});


// @route GET api/rosters/:id/events
// @desc Retrieves all events for a given roster
router.get('/roster/:id/events', async (req, res) => {

    // Define filter for querying rosters collection
    const rosterFilter = { _id: req.params.id };

    let res_errors = {};

    try {
        const roster = await Roster.findOne(rosterFilter);
        if (!roster) {
            res_errors.team_events = `No roster found with id ${rosterFilter._id}`;
            res.status(404).json(res_errors);
            return;
        }

        var roster_id_list = [roster._id];

        const eventFilter = {team_ids: { $elemMatch: {$in: roster_id_list }}};
        const events = await Event.find(eventFilter);

        if(!events) {
            res_errors.team_events = `No events found for roster ${rosterFilter._id}`;
            res.status(404).json(res_errors);
            return;
        }

        res.json(events);

    } catch(error) {
        console.log(error)
        res_errors.team_events = `Error finding events for roster ${rosterFilter._id}`;
        res.status(404).json(res_errors);
}
});

module.exports = router;