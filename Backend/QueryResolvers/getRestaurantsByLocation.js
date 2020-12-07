const mongoose = require('mongoose');
const Restaurant = require("../models/restaurantView");

getRestaurantsByLocation = async (location) => {
    try {
        const restaurants = await Restaurant.find({ location: location });
        return restaurants;
    } catch (e) {
        console.log(e);
    }
}

module.exports = getRestaurantsByLocation;