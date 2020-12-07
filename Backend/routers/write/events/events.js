const express = require('express');
const router = express.Router();
const Event = require('../../../models/eventView');
const User = require('../../../models/userView');
const Restaurant = require('../../../models/restaurantView');

router.post('/:_id', async (req, res) => {
    try {        
        const event = await ({
            eventName: req.body.eventName,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            description: req.body.description,
            time: req.body.time,
            hashTags: req.body.hashTags,
            restaurantId: req.params._id
        })
        try{
            Event.create(event, async function (err, newevent) {
                console.log(newevent);
                if (err) console.log(err);
                await Restaurant.findById(req.params._id, async function (err, restaurantView) {
                  if (err) console.log(err);
                  await restaurantView.events.push(newevent);
                  restaurantView.save();
                  console.log(restaurantView);
                  console.log(newevent);
                  console.log(event);
                  return res.status(200).send(restaurantView);
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
})

// router.post("/:userId/:eventId", async (req, res) => {
//   try {
//     const event = await {
//       userId: req.params.userId,
//       eventId: req.params.eventId,
//     };
//     try {
//       console.log(event.eventId);
//       await Event.findById(event.eventId, async function (err, regeventView) {
//         console.log(regeventView);
//         if (err) console.log(err);
//         await User.findById(event.userId, async function (err, userView) {
//           if (err) console.log(err);
//           const userDetails = await {
//             userId: event.userId,
//             userName: userView.firstName + userView.lastName,
//           };
//          console.log(regeventView);
//           await regeventView.registeredUsers.push(userDetails);
//           regeventView.save();
//           //return res.status(200).send("Registered for the event");
//           return res.status(200).send("Successfully registered for the event");
//         });
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   //return res.status(500).send("Internal Server Error!");
// });

router.post("/:userId/:eventId", async (req, res) => {
  try {
      const event = await {
          userId: req.params.userId,
          eventId: req.params.eventId,
      };
      try {
          Event.findById(event.eventId, async function (err, regeventView) {
              if (err) console.log(err);
              await User.findById(event.userId, async function (err, userView) {
                  if (err) console.log(err);
                  const userDetails = await {
                      userId: event.userId,
                      userName: userView.firstName + userView.lastName,
                  };  
                  await regeventView.registeredUsers.push(userDetails);
                  regeventView.save();
                  await userView.events.push(regeventView);
                  userView.save();
                  await Restaurant.findById(regeventView.restaurantId, async function (err, restaurantView) {
                      if (err) console.log(err)
                      console.log(restaurantView);
                      console.log(event.restaurantId);
                      await restaurantView.events.push(regeventView);
                      console.log(restaurantView);
                      restaurantView.save();
                  })
                  res.status(200).send("Successfully registered for the event");
              });
          });
      } catch (err) {
          console.log(err);
      }
  } catch (err) {
      console.log(err);
  }
  //return res.status(500).send("Internal Server Error!");
 });
 

module.exports = router;