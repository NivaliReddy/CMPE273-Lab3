const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://nivali:root@cluster0.iurqf.mongodb.net/yelp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
//console.log("Connection successful")