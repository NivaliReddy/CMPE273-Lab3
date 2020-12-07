const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderView = new Schema({
    orderId: String,
    orderDate: String,
    orderStatus: String,
    orderTime: String,
    modeOfDelivery: String,
    userId: String,
    restaurantId: String
})

const orderView = mongoose.model('orderview', OrderView);
module.exports = orderView;