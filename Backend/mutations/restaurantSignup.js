const Restaurant = require('../models/restaurantView');

const restaurantSignup = async (signupDetails) => {
    const restaurant = new Restaurant(signupDetails);
    try {
        await restaurant.save();
        return restaurant;
    } catch (e) {
        console.log(e)
    }
}

module.exports = restaurantSignup;