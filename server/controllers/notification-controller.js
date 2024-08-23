const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const userSchema = require("../models/userSchema");


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

//Setting notification as read
router.post('/notificationCheck', authMiddleware, async (req, res) => {
    const { notificationsIds, userId } = req.body;

    console.log(notificationsIds);

    try {
        const updatePromises = notificationsIds.map(id => {
            return userSchema.findOneAndUpdate(
                { _id: userId, 'notifications._id': id },
                {
                    $set: {
                        'notifications.$.read': true,
                        'notifications.$.readAt': new Date()
                    }
                },
                { new: true }
            ).exec();
        });

        const results = await Promise.all(updatePromises);

        const updatedCount = results.filter(result => result !== null).length;
        if (updatedCount !== notificationsIds.length) {
            console.log('Some notifications were not found or updated.');
        } else {
            console.log('All notifications marked as read.');
        }

        res.status(200).json({ message: 'Notifications marked as read', updatedCount });
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;