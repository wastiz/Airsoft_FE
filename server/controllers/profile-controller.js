const express = require('express');
const router = express.Router();
const UserSchema = require('../models/userSchema');
const { v4: uuidv4 } = require('uuid');

router.post('/profile', async (req, res) => {
    try {
        const userProfileData = req.body;

        const user = await UserSchema.findById(req.user.id)

        await user.save()
        return res.json(user)

        user.profile = userProfileData;

        await user.save();

        res.json(user.profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:userId/profile', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userProfileData = req.body;

        const user = await UserSchema.findById(userId);

        if (!user.profile) {
            return res.status(404).send('Profile is not found!');
        }

        user.profile = userProfileData;

        await user.save();

        res.json(user.profile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;