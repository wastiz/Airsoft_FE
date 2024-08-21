const mongoose = require('mongoose');
const ProfileSchema = require('./profileSchema');
const notificationSchema = require('./notificationSchema');


const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    notifications: {
        type: [notificationSchema],
        default: [],
    },
    profile: {
        type: ProfileSchema,
        default: () => ({}),
    },
});

const UserSchema = mongoose.model('User', userSchema);
module.exports = UserSchema;