const Menu = require("../models/menuView");

getMenu = async (restaurantId) => {
  try {
    console.log("Get Restaurant Menu");
    const menu = await Menu.find({ restaurantId: restaurantId })
    return menu;
  } catch (e) {
    console.log(e);
  }
}

module.exports = getMenu;