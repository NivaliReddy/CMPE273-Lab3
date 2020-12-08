const Order = require('../models/orderView');
const Restaurant = require('../models/restaurantView');
const User = require('../models/userView');

placeOrder = async (createOrder) => {
  try {
    console.log("Inside place order")
    const newOrder = await Order.create(createOrder);
    await newOrder.save()
    let restaurantView = await Restaurant.findById(createOrder.restaurantId)
    await restaurantView.orders.push(newOrder)
    await restaurantView.save()
    let userView = await User.findById(createOrder.userId)
    await userView.orders.push(newOrder)
    await userView.save()
    return newOrder
  } catch (e) {
    console.log(e)
  }
}

module.exports = placeOrder;