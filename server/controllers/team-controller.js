const express = require('express');
const router = express.Router();
const teamSchema = require('../models/teamSchema');
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

//Adding new Team
router.post('/', async (req, res) => {
    try {
        const newTeam = new teamSchema({
            ...req.body,
            _id: uuidv4()
        });

        await newTeam.save();
        res.json(newTeam);
    } catch (error) {
        console.error(error);
        res.status(500).send("Couldn't create team");
    }
});

//Getting all team's specific info
router.get('/', async (req, res) => {
    try {
        const teams = await teamSchema.find().select('name created coverPhoto members');
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
        console.log(teamId)
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

// Multer storage for events cover photo
const coverTeamImagesStore = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'server/uploads/cover-team-uploads');
    },
    filename: (_, file, cb) => {
        const uniqueSuffix = uuidv4();
        const originalName = file.originalname;
        const extension = originalName.substring(originalName.lastIndexOf('.'));
        cb(null, uniqueSuffix + extension);
    }
});

const coverUpload = multer({ storage: coverTeamImagesStore });

router.post('/uploadTeamCoverImage', coverUpload.single('coverImage'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        res.json({
            url: `http://localhost:5000/uploads/cover-team-uploads/${req.file.filename}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
