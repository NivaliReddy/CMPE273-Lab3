const express=require('express');
const router = express.Router();
const reviewRouter=require('./reviews/reviews');
const eventRouter=require('./events/events');
const orderRouter=require('./orders/orders');
const restaurantProfileRouter=require('./restaurantProfile/restaurantProfile');

router.use('/reviews',reviewRouter);
router.use('/events',eventRouter);
router.use('/orders',orderRouter);
router.use('/restaurant/profile', restaurantProfileRouter);

module.exports=router;