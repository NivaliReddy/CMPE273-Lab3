const mongoose=require('mongoose')
const Restaurant = require("../models/restaurantView")

getRestaurants = async(restaurantDetails)=>{  
    try {
        console.log("Search Restaurant by location and restaurant name")
        const { restaurantName, location, sortBy } = restaurantDetails;
        let restaurants = null;
        sortByArray = sortBy.split(":");
        sortByArray = sortBy.split(":");
        let sortObject = {};
        if(sortByArray.length == 2)
            sortObject[sortByArray[0]] = sortByArray[1];
        else
            sortObject[sortByArray[0]] = 'asc';
        
        if(restaurantName != null && location !=null) {
            restaurants = await Restaurant.find({ restaurantName: restaurantName, location: location }).exec();
        }
        else if(restaurantName != null) {
            restaurants = await Restaurant.find({ restaurantName: restaurantName }).exec();
        }
        else if(location != null) {
            restaurants = await Restaurant.find({ location: location }).exec();
        }
        else{
            restaurants = await Restaurant.find().exec();
        }           
      return restaurants
  } catch (e) {
    console.log(e)
  }
}

module.exports=getRestaurants;