const express = require('express');
const router = express.Router();
const Restaurant = require('./../../../mongoModels/restaurantView');

router.put('/:restaurantId', async (req, res) => {
    
    try {        
        const restaurant = await ({
            restaurantName: req.body.restaurantName,
            description: req.body.description,
            contactNumber: req.body.contactNumber,
            location: req.body.location,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            pictures: req.body.pictures,
            timings: req.body.timings,
            cuisines: req.body.cuisines,
            modeOfDelivery: req.body.modeOfDelivery            
        })
        const restaurantId = req.params.restaurantId;
        const updateCustomer = await Restaurant.update({restaurantView: restaurant}, {where: {id: restaurantId}});
        return res.status(200).send(updateCustomer);
    }
    catch (err) {
        console.log(err)
    }
    return res.status(500).send("Internal Server Error!");

})


module.exports = router;