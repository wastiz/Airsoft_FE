const mongoose = require('mongoose');
const avatarImg = require('../../src/img/avatar.jpg');

const profileSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: avatarImg
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

const ProfileSchema = mongoose.model('Profile', profileSchema);
module.exports = ProfileSchema;