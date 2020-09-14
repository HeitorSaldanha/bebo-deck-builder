const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://webapi:pJkxUwpvI628XWeY@bebocluster.4yqid.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = client;