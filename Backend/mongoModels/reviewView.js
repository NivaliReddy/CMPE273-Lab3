const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewView = new Schema({
    reviewId: String,
    date: String,
    rating: String,
    review: String,
    userId: String,
    restaurantId: String
})

const reviewView = mongoose.model('reviewview', ReviewView);
module.exports = reviewView;