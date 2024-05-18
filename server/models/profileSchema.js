const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    avatar: Buffer,
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    age: Number,
    phone: {
        type: String,
        default: ""
    },
    aboutMe: {
        type: String,
        default: ""
    },
    roles:{
        type: [String],
        default: [""]
    },
    team: {
        type: [String],
        default: [""]
    },
    favWeapon: {
        type: String,
        default: ''
    }
});

module.exports = profileSchema;