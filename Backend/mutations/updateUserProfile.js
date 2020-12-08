const User = require('../models/userView');

updateUserProfile = async (userDetails) => {
  try {
    console.log(userDetails);
    const user = await User.findByIdAndUpdate(userDetails._id, userDetails, { new: true });
    return user;
  } catch (e) {
    console.log(e);
  }
}

module.exports = updateUserProfile;