const Menu = require("../models/menuView");
const Restaurant = require("../models/restaurantView");

postDish = async (createDish) => {
  try {
    const newdish = Menu.create(createDish);
    const restaurantView = await Restaurant.findById(createDish.restaurantId);
    await restaurantView.menu.push(newdish);
    await restaurantView.save();
    console.log(restaurantView);
    console.log(newdish);
    return restaurantView;
  } catch (e) {
    console.log(e);
  }
};

module.exports = postDish;