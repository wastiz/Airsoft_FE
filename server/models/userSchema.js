const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
});

const UserSchema = mongoose.model('Post', userSchema);
module.exports = UserSchema;