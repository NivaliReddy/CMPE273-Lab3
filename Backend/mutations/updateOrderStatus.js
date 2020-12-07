const Order = require('../models/orderView')
updateOrderStatus = async (orderId,orderStatus) => {
    console.log()
    try {
        const order = await ({
            orderStatus: orderStatus
        })
        let orderView = await Order.findOneAndUpdate({_id : orderId}, order, {new: true})
        await orderView.save()        
        let restaurantView = await Restaurant.findOneAndUpdate({'orders._id': orderId}, {'orders.$.orderStatus': order.orderStatus}, {new: true});
        await restaurantView.save();
        let userView = await User.findOneAndUpdate({'orders._id': orderId}, {'orders.$.orderStatus': order.orderStatus}, {new: true});
        await userView.save();       
        return orderView;
    } catch (e) {
        console.log(e)
    }
}

module.exports=updateOrderStatus

