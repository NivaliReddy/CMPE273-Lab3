const Restaurant = require("../models/restaurantView");

restaurantSearch = async (restaurantDetails) => {
    try {
        console.log("Search Restaurant by location and restaurant name")
        const { restaurantName, location } = restaurantDetails;
        let restaurants = null;
        if (restaurantName != null && location != null) {
            restaurants = await Restaurant.find({ restaurantName: restaurantName, location: location }).exec();
        }
        else if (restaurantName != null) {
            restaurants = await Restaurant.find({ restaurantName: restaurantName }).exec();
        }
        else if (location != null) {
            restaurants = await Restaurant.find({ location: location }).exec();
        }
        else {
            restaurants = await Restaurant.find().exec();
        }
        return restaurants;
    } catch (e) {
        console.log(e);
    }
}

module.exports = restaurantSearch;