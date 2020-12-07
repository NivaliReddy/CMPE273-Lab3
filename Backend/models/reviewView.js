const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewView = new Schema({
    reviewId: String,
    date: String,
    rating: String,
    review: String,
    restaurantId: String,
    user: {
        userId: String,
        userName: String,
        picture: String
    }
})

const reviewView = mongoose.model('reviewview', ReviewView);
module.exports = reviewView;