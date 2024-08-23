const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require("../middlewares/auth-middleware");
const userSchema = require("../models/userSchema");
const teamSchema = require("../models/teamSchema");
const notificationSchema = require("../models/notificationSchema");

const notificationTypeEnum = ['app', 'team_join_request', 'team_joined', 'message', 'event_registered'];

//Adding notification to user
router.post('/notification/add', async (req, res) => {
    const {type, content} = req.body;

    if (notificationTypeEnum.includes(type)) {
        try {
            if (type === 'app') {
                const user = await userSchema.findById(content.userId)
                const newNotification = new notificationSchema({ _id: uuidv4(), type: type, title: content.title, message: content.message });
                user.notifications.push(newNotification);
                await user.save();
                res.status(200).json({ message: 'Notification added successfully' });
            }
            if (type === 'team_join_request') {
                const sender = await userSchema.findById(content.senderId).select('username');
                const senderUsername = sender.username;
                const team = await teamSchema.findById(content.teamId).select('author name');
                const receiver = await userSchema.findById(team.author);
                const newNotification = new notificationSchema({ _id: uuidv4(), type: type, title: "New Team Request", message: `User ${senderUsername} wants to join your team "${team.name}"` });
                receiver.notifications.push(newNotification);
                await receiver.save();
                res.status(200).json({ message: 'Notification added successfully' });
            }
            if (type === 'team_joined') {
                const sender = await userSchema.findById(content.senderId).select('username');
                const senderUsername = sender.username;
                const team = await teamSchema.findById(content.teamId).select('author name');
                const receiver = await userSchema.findById(team.author);
                const newNotification = new notificationSchema({ _id: uuidv4(), type: type, title: "New Team Member", message: `User ${senderUsername} has joined your team "${team.name}"` });
                receiver.notifications.push(newNotification);
                await receiver.save();
                res.status(200).json({ message: 'Notification added successfully' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(`Couldn't add notification with type ${type}`);
        }
    } else {
        res.status(500).send("Notification type is invalid");
    }
})

//Getting user's notifications by id
router.get('/user-notifications', authMiddleware, async (req, res) => {
    const {userId} = req.body;

    try {
        const user = await userSchema.findById(userId).select('notifications');
        console.log(user)
        res.json(user.notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Couldn't get user's notifications" });
    }
})

module.exports = router;