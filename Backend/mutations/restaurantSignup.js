const Restaurant = require('../mongoModels/restaurantView')

const restaurantSignup = async (signupDetails) => {
    const user = new Restaurant(signupDetails)
    try {
        await user.save()
        return user;
    } catch (e) {
        console.log(e)
    }
}

module.exports=restaurantSignup