const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventView = require("./eventView");
const reviewView = require("./reviewView");
const orderView = require("./orderView");

const RestaurantView = new Schema({
  restaurantId: String,
  restaurantName: String,
  emailId: String,
  password: String,
  description: String,
  contactNumber: String,
  location: String,
  latitude: String,
  longitude: String,
  pictures: String,
  timings: String,
  cuisines: String,
  modeOfDelivery: String,
  averageRating: String,
  menu: [
    {
      dishId: String,
      dishName: String,
      mainIngredients: String,
      pictures: String,
      price: Number,
      description: String,
      dishCategory: String,
    },
  ],

  reviews: [
    {
      reviewId: String,
      date: String,
      rating: String,
      review: String,
      user: {
        userId: String,
        userName: String,
        profilePic: String
      }
    },
  ],

  events : [eventView.schema],

  orders : [orderView.schema]

});

const restaurantView = mongoose.model("restaurantview", RestaurantView);
module.exports = restaurantView;