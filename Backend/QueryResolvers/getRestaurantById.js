const mongoose = require('mongoose');
const Restaurant = require("../models/restaurantView");

getRestaurantById = async (restaurantId) => {
    try {
        console.log(restaurantId);
        const restaurant = await Restaurant.findById(restaurantId);
        console.log(restaurant);
        return restaurant;
    } catch (e) {
        console.log(e);
    }
}

module.exports = getRestaurantById;