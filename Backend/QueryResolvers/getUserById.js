const mongoose = require('mongoose');
const User = require("../models/userView");

getUserById = async (userId) => {
    try {
        console.log("Get user by id");
        const user = await User.findById({_id: userId});
        return user;
    } catch (e) {
        console.log(e);
    }
}

module.exports = getUserById;