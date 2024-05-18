const express = require('express');
const router = express.Router();
const eventSchema = require('../models/eventSchema');

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

module.exports = router;