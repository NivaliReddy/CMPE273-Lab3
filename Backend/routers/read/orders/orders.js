const express = require('express');
const router = express.Router();
const Order = require('../../../models/orderView');

// router.get('/', async (req, res) => {
//     try {
//         const orders = await Order.find();
//         return res.status(200).send(orders);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).send('Internal Server Error!');
//     }
// })

router.get('/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        console.log(orderId);
        const orders = await Order.findById({_id: orderId});
        console.log(orders);
        return res.status(200).send(orders);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

module.exports = router;