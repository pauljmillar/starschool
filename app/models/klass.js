// load the things we need
var mongoose = require('mongoose'), Schema = mongoose.Schema;

// define the schema for our klass model
var klassSchema = mongoose.Schema({

        name        : String,
        shortDesc   : String,
        longDesc    : String,
        teacherId   : String, //{type: Schema.Types.ObjectId, ref: 'User'},
        numStudents : { type: Number, default: 0},
        joinCode    : String,
        pointsOn    : { type: Boolean, default: true}
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Klass', klassSchema);