const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuView = new Schema({
  dishId: String,
  dishName: String,
  mainIngredients: String,
  pictures: String,
  price: Number,
  description: String,
  dishCategory: String,
  restaurantId: String
});

const menuView = mongoose.model("menuview", MenuView);
module.exports = menuView;
