const User = require('../mongoModels/user')

const userSignup = async (signupDetails) => {
    const user = new Restaurant(signupDetails)
    try {
        await user.save()
        return user;
    } catch (e) {
        console.log(e)
    }
}


module.exports=userSignup