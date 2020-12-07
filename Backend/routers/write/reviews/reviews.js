const express = require('express');
const router = express.Router();
const Review = require('../../../models/reviewView');
const User = require('../../../models/userView');
const Restaurant = require('../../../models/restaurantView');

router.post('/', async (req, res) => {
    try {        
        const review = await ({
            date: req.body.date,
            rating: req.body.rating,
            review: req.body.review,
            userId: req.body._id,
            restaurantId: req.body.restaurantId         
        })
        try{
            Review.create(review, async function (err, newreview) {
                if (err) console.log(err);
                await User.findById(review.userId, async function (err, userView) {
                  if (err) console.log(err);
                  await userView.reviews.push(newreview);
                  userView.save();
                    await Restaurant.findById(req.body.restaurantId, async function (err, restaurantView) {
                        if (err) console.log(err);
                        //await restaurantView.reviews.push(newreview);
                        const reviewDetails = await ({
                            date: req.body.date,
                            rating: req.body.rating,
                            review: req.body.review,
                            restaurantId: req.body.restaurantId,
                            user: {
                                userId: userView._id,
                                userName: userView.firstName + " " + userView.lastName,
                                picture: userView.picture
                            }
                        })
                        //console.log("restaurant view before push")
                        await restaurantView.reviews.push(reviewDetails);
                        //console.log("restaurant view after push")
                        restaurantView.save();
                        //console.log(restaurantView);
                    });
                    //console.log(userView);
                    return res.status(200).send(userView);
                });
            });
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