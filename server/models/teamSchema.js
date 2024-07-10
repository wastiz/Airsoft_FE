const mongoose= require('mongoose');

const teamSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        ref: 'User',
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    rules: {
        type: String,
        default: '',
    },
    memberLimit: {
        type: Number,
        required: true,
    },
    members: {
        type: [String],
        ref: 'User',
        default: []
    },
    joinMethod: {
        type: String,
        enum: ['opened', 'request', 'restricted'],
        required: true,
    },
    coverPhoto: {
        type: String,
        default: ''
    },
    otherPhotos: {
        type: [String],
        default: []
    },
    participated: {
        type: [String],
        default: []
    },
});

const TeamSchema = mongoose.model('Team', teamSchema);
module.exports = TeamSchema;