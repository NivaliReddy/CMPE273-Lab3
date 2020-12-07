const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventView = new Schema({
    eventId: String,
    eventName: String,
    startDate: String,
    endDate: String,
    city: String,
    state: String,
    country: String,
    description: String,
    time: String,
    hashTags: String,
    restaurantId: String,
    registeredUsers : [{
        userId: String,
        userName: String,
        profilePic: String
    }]
})

const eventView = mongoose.model('eventview', EventView);
module.exports = eventView;