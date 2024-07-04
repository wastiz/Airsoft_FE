const express = require('express');
const router = express.Router();
const UserSchema = require('../models/userSchema');
const teamSchema = require('../models/teamSchema');
const eventSchema = require('../models/eventSchema');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require("../middlewares/auth-middleware");
const userSchema = require("../models/userSchema");
const {ObjectId} = require("mongodb");


//Getting profile on profile page
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userSchema.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user.profile);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server error" });
    }
});


//Editing profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const updates = req.body;
        const updatedUser = await userSchema.findByIdAndUpdate(
            req.user.id,
            { profile: { ...updates } },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            message: "Profile updated successfully"
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error" });
    }
});

//Getting user's posts
router.get('/profile/posts', authMiddleware, async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: 'Author ID is required' });
    }

    try {
        const teams = await teamSchema.find({ author: id }).select('name coverPhoto members');

        const events = await eventSchema.find({ author: id }).select('title date photos.coverPhoto');

        res.json({ teams, events });
    } catch (err) {
        console.error('Error fetching author content:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;