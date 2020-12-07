const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./../../../mongoModels/userView');
const Restaurant = require('./../../../mongoModels/restaurantView');

router.post('/user', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptpassword = await bcrypt.hash(req.body.password, salt);
        const user = await ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: encryptpassword,
            zipCode: req.body.zipCode            
        })
        const newuser = new User(user);
        await newuser.save();
        console.log(newuser);
        return res.status(200).send(newuser);
    }
    catch (err) {
        console.log(err)
    }
    return res.status(500).send("Internal Server Error!");
})

router.post('/restaurant', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptpassword = await bcrypt.hash(req.body.password, salt);
        const restaurant = await ({
            restaurantName: req.body.restaurantName,
            emailId: req.body.emailId,
            password: encryptpassword,
            location: req.body.location            
        })
        const newrestaurant = new Restaurant(restaurant);
        await newrestaurant.save();
        console.log(newrestaurant);
        return res.status(200).send(newrestaurant);
    }
    catch (err) {
        console.log(err)
    }
    return res.status(500).send("Internal Server Error!");
})

module.exports = router;