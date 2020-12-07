const mongoose=require('mongoose')
const Order = require('../models/orderView')

getMenu=async(restaurantId)=>{  
    try {
      console.log("Get Restaurant Orders")
      const orders = await Order.find({ restaurantId: restaurantId })
      return orders
  } catch (e) {
    console.log(e)
  }
}

module.exports=getMenu;