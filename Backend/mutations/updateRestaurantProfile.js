const Restaurant = require('../models/restaurantView');

updateRestaurantProfile = async (restaurantDetails) => {
  try {
    console.log(restaurantDetails);
    const restaurant = await Restaurant.findByIdAndUpdate(restaurantDetails._id, restaurantDetails, { new: true });
    return restaurant;
  } catch (e) {
    console.log(e);
  }
}

module.exports = updateRestaurantProfile;