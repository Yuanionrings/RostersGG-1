const express = require('express');
const router = express.Router();

// Load input validation
// None yet

// Load mongoose Roster and Event models
//const Roster = require("../../models/RosterSchema");
const Event = require('../../../models/EventSchema');


// @route GET api/events/event/:id
// @desc Retrieves public info of single event if found
router.get('/event/:id', async (req, res) => {

    // Define filters for querying database
    const eventFilter = { _id: req.params.id };

    let res_errors = {};

    try{
        const event = await Event.findOne(eventFilter);
        if (!event) {
            res_errors.getevent = 'No event found with this id';
            res.status(404).json(res_errors);
            return;
        }
        res.json(event);
        
    } catch(error) {
        console.log(error);
        res_errors.getevent = 'Bad request, this may require more debugging';
        res.status(400).json(res_error);
    }
});


// @route GET api/events/event/:id/teams
// @desc Retrieves list of teamnames that are associated with event
router.get('/event/:id/teams', async (req, res) => {

    // Define filters for querying database
    const eventFilter = { _id: req.params.id };
    const eventProjection = { teams_names:1 };

    let res_errors = {};

    try{
        const event_teams = await Event.findOne(eventFilter, eventProjection);
        if (!event) {
            res_errors.getevent = 'No event found with this id';
            res.status(404).json(res_errors);
            return;
        }
        
        res.json(event_teams);
        
    } catch(error) {
        console.log(error);
        res_errors.getevent = 'Bad request, this may require more debugging';
        res.status(400).json(res_error);
    }
});


module.exports = router;