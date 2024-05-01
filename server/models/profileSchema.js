const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: '../../src/img/avatar.jpg'
    },
    firstName: {
        type: String,
        default: "not provided"
    },
    lastName: {
        type: String,
        default: "not provided"
    },
    age: Number,
    phone: {
        type: String,
        default: "not provided"
    },
    aboutMe: {
        type: String,
        default: "not provided"
    },
    roles:[String],
    team: [String],
    favWeapon: String
});

module.exports = profileSchema;