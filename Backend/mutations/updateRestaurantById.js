const User=require('../models/userView')


updateRestaurantById=async(restaurant)=>{
    try {
      console.log(restaurant)
      const user = await User.findByIdAndUpdate(restaurant.Id, restaurant,{new:true})
      return user
    } catch (e) {
      console.log(e)
    }
  }

  module.exports=updateRestaurantById