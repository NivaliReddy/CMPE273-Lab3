const User = require('../models/userView')

const userLogin = async (loginDetails) => {
  try {
    console.log(loginDetails);
    const user = await User.findOne(loginDetails);
    if (!user) {
      throw "user not found";
    }
    else if (loginDetails.password != user.password) {
      throw "Wrong password";
    }
    return user;
  } catch (e) {
    throw e
  }
}

module.exports = userLogin;