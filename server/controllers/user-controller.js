const express = require('express');
const router = express.Router();
const userSchema = require('../models/userSchema');

router.get('/', async (req, res) => {
    try {
        const users = await userSchema.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/username/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await userSchema.findOne({ 'username': username });
        if (!user) {    
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

router.get('/id/:id', async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = await userSchema.create(req.body);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;