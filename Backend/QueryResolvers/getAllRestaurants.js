const mongoose = require('mongoose');
const Restaurant = require("../models/restaurantView");

getAllRestaurants = async () => {
  try {
    const restaurants = await Restaurant.find();
    console.log(restaurants);
    return restaurants;
  } catch (e) {
    console.log(e)
  }
}

module.exports = getAllRestaurants;