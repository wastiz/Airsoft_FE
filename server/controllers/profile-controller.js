const express = require('express');
const router = express.Router();
const UserSchema = require('../models/userSchema');
const teamSchema = require('../models/teamSchema');
const eventSchema = require('../models/eventSchema');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require("../middlewares/auth-middleware");
const userSchema = require("../models/userSchema");

//Getting profileData by id
router.get('/profile/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userSchema.findOne({ _id: userId });
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
router.get('/profile/posts/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params;

    console.log(userId);

    if (!userId) {
        return res.status(400).json({ message: 'Author ID is required' });
    }

    try {
        const teams = await teamSchema.find({ author: userId }).select('name created coverPhoto members');

        const events = await eventSchema.find({ author: userId }).select('title created date photos.coverPhoto');

        const combinedArray = [...teams, ...events];

        const parseDate = (dateStr) => {
            const [day, month, year] = dateStr.split('.');
            return new Date(`20${year}-${month}-${day}`); // Предполагаем, что год - 20xx
        };

        combinedArray.sort((a, b) => {
            const dateA = a.date ? parseDate(a.date) : new Date(0); // Если нет даты, используем начало эпохи
            const dateB = b.date ? parseDate(b.date) : new Date(0);
            return dateA - dateB;
        });
        res.json(combinedArray);
    } catch (err) {
        console.error('Error fetching author content:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;