const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./../../../mongoModels/userView');
const Restaurant = require('./../../../mongoModels/restaurantView');

router.post('/user', async (req, res) => {
    const emailId = req.body.emailId
    const password = req.body.password    
    try {
        const user = await User.findOne({emailId : emailId});
        console.log(user)
        if (user === null) {
            return res.status(404).json({ errorMsg: [{ msg: "User not found!" }] });
        }
        else {
            const isCorrect = await bcrypt.compare(password, user.password);
            if (!isCorrect){
                res.status(401).json({ errorMsg: [{ msg: "Invalid password!" }] });
            }
            else {
                console.log("Login successful!");
                return res.status(200).send(user);
            }
        }        
        return res.status(200).send(user);
    }
    catch (err) {
        console.log(err)
    }
    //return res.status(500).send("Internal Server Error!");
})

router.post('/restaurant', async (req, res) => {
    const emailId = req.body.emailId
    const password = req.body.password    
    try {
        const restaurant = await Restaurant.findOne({emailId : emailId});
        console.log(restaurant)
        if (restaurant === null) {
            return res.status(404).json({ errorMsg: [{ msg: "Restaurant not found!" }] });
        }
        else {
            const isCorrect = await bcrypt.compare(password, restaurant.password);
            if (!isCorrect){
                res.status(401).json({ errorMsg: [{ msg: "Invalid password!" }] });
            }
            else {
                console.log("Login successful!");
                return res.status(200).send(restaurant);
            }
        }        
        return res.status(200).send(restaurant);
    }
    catch (err) {
        console.log(err)
    }
    //return res.status(500).send("Internal Server Error!");
})

module.exports = router;