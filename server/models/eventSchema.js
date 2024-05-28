const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    _id: String,
    title: String,
    description: String,
    rules: String,
    plot: String,
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
    services: Array,
    coverPhoto: String,
    photos: [String],
    regForm: {
      	firstName: Boolean,
      	lastName: Boolean,
      	nickname: Boolean,
      	email: Boolean,
      	phone: Boolean,
      	age: Boolean,
        cash: Boolean,
        transfer: Boolean,
        arbitrary: Boolean,
      	arbitraryContent: Array
    },
    orgFirstName: String,
    orgLastName: String,
    orgEmail: String,
});

const EventSchema = mongoose.model('Event', eventSchema);
module.exports = EventSchema;