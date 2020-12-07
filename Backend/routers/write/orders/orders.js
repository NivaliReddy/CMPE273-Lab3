const express = require('express');
const router = express.Router();
const Order = require('../../../models/orderView');
const User = require('../../../models/userView');
const Restaurant = require('../../../models/restaurantView');

// router.post('/', async (req, res) => {
//     try {        
//         const order = await ({
//             orderDate: req.body.orderDate,
//             orderStatus: req.body.orderStatus,
//             orderTime: req.body.orderTime,
//             restaurantId: req.body.restaurantId,
//             modeOfDelivery: req.body.modeOfDelivery
//         })
//         try{
//             Order.create(order, async function (err, neworder) {
//                 if (err) console.log(err);
//                 await User.findOne(Order.userId, async function (err, userView) {
//                   if (err) console.log(err);
//                   await userView.orders.push(neworder);
//                   console.log(userView);
//                   //return res.status(200).send("Review added");
//                   return res.status(200).send(userView);
//                 });
//               });
//         }
//         catch (err) {
//             console.log(err)
//         }
        
//     }
//     catch (err) {
//         console.log(err)
//     }
//     //return res.status(500).send("Internal Server Error!");

// })

router.post('/:userId', async (req, res) => {
    try {        
        const order = await ({
            orderDate: req.body.orderDate,
            orderStatus: req.body.orderStatus,
            orderTime: req.body.orderTime,
            restaurantId: req.body.restaurantId,
            modeOfDelivery: req.body.modeOfDelivery,
            userId: req.params.userId
        })
        try{
            Order.create(order, async function (err, neworder) {
                if (err) console.log(err);
                await Restaurant.findById(order.restaurantId, async function (err, restaurantView) {
                  if (err) console.log(err);
                  await restaurantView.orders.push(neworder);
                  //console.log(restaurantView);
                  //return res.status(200).send("Review added");
                  restaurantView.save();
                  await User.findById(order.userId, async function (err, userView) {
                    if (err) console.log(err);
                    await userView.orders.push(neworder);
                    //console.log(userView);
                    //return res.status(200).send("Review added");
                    userView.save();
                  return res.status(200).send("Order placed");
                });
              });
            })
        }
        catch (err) {
            console.log(err)
        }
        
    }
    catch (err) {
        console.log(err)
    }
    //return res.status(500).send("Internal Server Error!");

})

router.put('/:orderId', async (req, res) => {
    try {        
        const order = await ({
            orderStatus: req.body.orderStatus
        })
        const filter = { _id: req.params.orderId };
        try{
            let orderView = await Order.findOneAndUpdate(filter, order, {
                new: true
            });
            await orderView.save();
            const resfilter = {'orders._id': req.params.orderId};
            const resupdate = await ({
                'orders.$.orderStatus': req.body.orderStatus
            })
            try {
                let restaurantView = await Restaurant.findOneAndUpdate(resfilter, resupdate, {
                    new: true
                });
                restaurantView.save();       
                try{
                    let userView = await User.findOneAndUpdate(resfilter, resupdate, {
                        new: true
                    });
                    userView.save();
                    return res.status(200).send(orderView);
                }
                catch (err) {
                    console.log(err);
                }
            }
            catch (err) {
                console.log(err)
            }
            
        }
        catch (err) {
            console.log(err)
        }
        
    }
    catch (err) {
        console.log(err)
    }
    //return res.status(500).send("Internal Server Error!");

})

module.exports = router;