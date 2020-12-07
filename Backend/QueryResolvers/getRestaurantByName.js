const mongoose = require('mongoose');
const Restaurant = require("../models/restaurantView");

getRestaurantsByName = async (restaurantName) => {
    try {
        const restaurants = await Restaurant.find({ restaurantName: restaurantName });
        return restaurants;
    } catch (e) {
        console.log(e);
    }
}

module.exports = getRestaurantsByName;