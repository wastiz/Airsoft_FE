const express = require('express');
const router = express.Router();
const teamSchema = require('../models/teamSchema');
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

//Adding new Team
router.post('/', async (req, res) => {
    try {
        const newTeam = await teamSchema.create(req.body);
        res.json(newTeam);
    } catch (error) {
        console.error(error);
        res.status(500).send("Couldn't create team");
    }
});

//Getting all team's specific info
router.get('/', async (req, res) => {
    try {
        const teams = await teamSchema.find().select('name created members');
        res.json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Getting Team by id
router.get('/:teamId', async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const team = await teamSchema.findById(teamId);

        if (!team) {
            return res.status(404).json({
                message: 'Team not found'
            });
        }

        res.json(team);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Cannot get team by id'
        });
    }
});


module.exports = router;
