const User = require('../models/userView');

const userSignup = async (signupDetails) => {
    const user = new User(signupDetails);
    try {
        await user.save();
        console.log(user);
        return user;
    } catch (e) {
        console.log(e);
    }
}

module.exports = userSignup;