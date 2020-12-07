const Restaurant = require('../models/restaurantView')

const restaurantLogin = async (loginDetails) => {
    try {
        const user = await Restaurant.findOne(loginDetails)
        if(!user){
            throw "user not found"
        }
        else if(loginDetails.password != user.password){
            throw "Wrong password"
        }
        return user;
    } catch (e) {
        throw e
    }

}

module.exports=restaurantLogin