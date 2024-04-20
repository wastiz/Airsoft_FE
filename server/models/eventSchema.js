const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    _id: String,
    title: String,
    description: String,
    rules: String,
    date: String,
    start: String,
    price: String,
    location: String,
    ageRestriction: String,
    regForm: {
      	firstName: Boolean,
      	lastName: Boolean,
      	nickname: Boolean,
      	email: Boolean,
      	phone: Boolean,
      	age: Boolean,
      	arbitrary: Boolean,
      	arbitraryContent: Array
    },
    orgFirstName: String,
    orgLastName: String,
    orgEmail: String,
});

const EventSchema = mongoose.model('Post', eventSchema);
module.exports = EventSchema;