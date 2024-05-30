const express = require('express');
const router = express.Router();
const eventSchema = require('../models/eventSchema');
const multer = require("multer");

router.post('/', async (req, res) => {
    try {
        const newEvent = await eventSchema.create(req.body);
        res.json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/', async (req, res) => {
    try {
        const events = await eventSchema.find();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await eventSchema.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }

        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// Multer storage for event cover photo
const coverEventImagesStore = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'server/uploads/cover-event-uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const coverUpload = multer({ storage: coverEventImagesStore });

router.post('/uploadCoverImage', coverUpload.single('coverImage'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        res.json({
            url: `http://localhost:5000/uploads/cover-event-uploads/${req.file.filename}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Multer storage for event other photos
const otherEventImagesStore = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'server/uploads/other-event-uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const otherUpload = multer({ storage: otherEventImagesStore });

router.post('/uploadOtherImage', otherUpload.array('otherImages', 10), (req, res) => {
    try {
        const files = req.files;
        const urls = files.map(file => `http://localhost:5000/uploads/other-event-uploads/${file.filename}`);

        res.json({ urls });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;