const User=require('../models/userView')


updateUserById=async(customer)=>{
    try {
      console.log(customer)
      const user = await User.findByIdAndUpdate(customer.id, customer,{new:true})
      return user
    } catch (e) {
      console.log(e)
    }
  }

  module.exports=updateUserById