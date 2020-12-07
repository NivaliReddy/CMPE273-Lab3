const express = require('express');
require('./db/MongoDatabase');
const cors = require('cors');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use(express.json());

app.use('/graphql', graphqlHTTP({
    graphiql : true,
    schema : schema
}));

module.exports=app;