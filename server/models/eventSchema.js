const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    _id: String,
    author: {
        type: String,
        ref: 'User',
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    title: String,
    description: String,
    rules: String,
    gamePlot: String,
    date: String,
    price: String,
    location: String,
    ageRestriction: Number,
    times: {
        meeting: String,
        briefing: String,
        start: String,
        end: String,
    },
    services: {
        foodService: Boolean,
        hpaService: Boolean,
        toiletService: Boolean,
        shopService: Boolean,
        otherService: String,
    },
    photos: {
        coverPhoto: String,
        otherPhoto: [String],
    },
    regForm: {
      	firstName: Boolean,
      	lastName: Boolean,
      	nickname: Boolean,
      	email: Boolean,
      	phone: Boolean,
      	age: Boolean,
        cash: Boolean,
        transfer: Boolean,
      	arbitraryContent: Array
    },
    orgFirstName: String,
    orgLastName: String,
    orgEmail: String,
});

const EventSchema = mongoose.model('Event', eventSchema);
module.exports = EventSchema;