const express = require('express');
const router = express.Router();
const Event = require('../../../mongoModels/eventView');

router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        console.log(events);
        res.status(200).send(events);
    } catch (err) {
        console.log(err);
        //return res.status(500).send('Internal Server Error!');
    }
})

router.get('/eventDetails/:_id', async (req, res) => {
    try {
        const events = await Event.findById(req.params._id);
        console.log(events);
        return res.status(200).send(events);
    } catch (err) {
        console.log(err);
        //return res.status(500).send('Internal Server Error!');
    }
})

module.exports = router;