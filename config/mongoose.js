const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/codeial_devp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error connection in database"));

db.once('open', function(){
    console.log("Connected to database")
});

module.exports =db;