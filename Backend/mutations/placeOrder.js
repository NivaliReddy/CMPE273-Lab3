const Order = require('../models/orderView')
const Restaurant = require('../models/restaurantView')

postOrder=async(createOrder)=>{
    const newOrder = new Order(createOrder)
    try {
        await newOrder.save()
        let restaurantView = await Restaurant.findById(createOrder.restaurantId)
        await restaurantView.orders.push(newOrder)
        console.log(restaurantView)
        restaurantView.save()
        let userView = await User.findById(createOrder.userId)
        await userView.orders.push(newOrder)
        console.log(userView)
        userView.save()
      return newOrder
    } catch (e) {
      console.log(e)
    }
  }

module.exports=postOrder