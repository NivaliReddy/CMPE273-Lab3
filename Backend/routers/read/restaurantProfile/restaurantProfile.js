const express = require('express');
const router = express.Router();

const RestaurantView = require('../../../mongoModels/restaurantView');

router.get('/:restaurantId', async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const restaurant = await RestaurantView.find({_id : restaurantId});
        return res.status(200).send(restaurant);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

module.exports = router;