// load the things we need
var mongoose = require('mongoose');

// define the schema for our klass model
var klassSchema = mongoose.Schema({

        name        : String,
        shortDesc   : String,
        longDesc    : String,
        teacherId   : String,
        numStudents : { type: Number, default: 0},
        joinCode : String
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Klass', klassSchema);