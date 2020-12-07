const express = require('express');
const router = express.Router();
const Review = require('../../../models/reviewView');

router.get('/restaurant/:restaurantId', async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const reviews = await Review.find({restaurantId: restaurantId});
        return res.status(200).send(reviews);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const reviews = await Review.find({userId: userId});
        console.log(userId);
        console.log(reviews);
        return res.status(200).send(reviews);
    } catch (err) {
        console.log(err);
        //return res.status(500).send('Internal Server Error!');
    }
})

module.exports = router;