const Restaurant = require('../models/restaurantView')

const restaurantLogin = async (loginDetails) => {
    try {
        const restaurant = await Restaurant.findOne(loginDetails);
        if (!restaurant) {
            throw "Restaurant not found";
        }
        else if (loginDetails.password != restaurant.password) {
            throw "Wrong password";
        }
        return restaurant;
    } catch (e) {
        throw e
    }
}

module.exports = restaurantLogin;