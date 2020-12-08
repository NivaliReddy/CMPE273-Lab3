const Menu = require("../models/menuView");
const Restaurant = require("../models/restaurantView");

addDish = async (createDish) => {
  try {
    console.log("Inside add dish")
    const newdish = await Menu.create(createDish);
    const restaurantView = await Restaurant.findById(createDish.restaurantId);
    await restaurantView.menu.push(newdish);
    await restaurantView.save();
    //console.log(newdish);
    return newdish;
  } catch (e) {
    console.log(e);
  }
};

module.exports = addDish;