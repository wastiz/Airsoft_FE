const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    avatar: { type: String, default: ""},
    firstName: { type: String, default: ""},
    lastName: { type: String, default: ""},
    age: { type: Number, default: null},
    phone: { type: String, default: ""},
    aboutMe: { type: String, default: ""},
    roles:{ type: [String], default: [""]},
    team: { type: [String], default: [""]},
    favWeapon: { type: String, default: ''}
});

module.exports = profileSchema;