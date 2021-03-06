var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/lala");

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
    console.log('Could not connect to mongo server!');
    console.log(err);
});

mongoose.connect('mongodb://localhost/mongodb');

module.exports.lalatokens=mongoose.model('tokens',new Schema({
    total:String
},{strict: false}));
module.exports.tradeHistory=mongoose.model('history',new Schema({
    etvolume : String,
    tokenvolume  : String,
    date    : Date
}));