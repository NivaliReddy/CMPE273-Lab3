const mongoose = require("mongoose");
const reviewView = require("./reviewView");
const eventView = require("./eventView");
const orderView = require("./orderView");
const Schema = mongoose.Schema;

const UserView = new Schema({
  userId: String,
  firstName: String,
  lastName: String,
  emailId: String,
  password: String,
  dateOfBirth: String,
  nickName: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  headLine: String,
  phoneNumber: String,
  yelpingSince: String,
  thingsILove: String,
  findMeIn: String,
  myWebsite: String,
  picture: String,
  favorites: String,

  reviews : [reviewView.schema],

  events : [eventView.schema],

  orders : [orderView.schema]
});

const userView = mongoose.model("userview", UserView);
module.exports = userView;