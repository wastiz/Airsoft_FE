const express = require('express');
const router = express.Router();
const UserSchema = require('../models/userSchema');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require("../middlewares/auth-middleware");
const userSchema = require("../models/userSchema");


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


module.exports = router;