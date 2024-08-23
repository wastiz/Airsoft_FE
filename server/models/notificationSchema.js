const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['app', 'team_join_request', 'team_joined', 'message', 'event_registered'],
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    readAt: { type: Date, default: null },
});

module.exports = notificationSchema;