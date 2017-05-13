// load the things we need
var mongoose = require('mongoose'), Schema = mongoose.Schema;

// define the schema for our klass model
var assignmentSchema = mongoose.Schema({

        name          : String,
        description   : String,
        due           : { type: Date, default: Date.now },
        klassId       :  {type: Schema.Types.ObjectId, ref: 'Klass'},
        teacherId      : String,
        isAnnouncement : Boolean,
        numComplete : { type: Number, default: 0},
        numNotComplete : { type: Number, default: 0},
        points       : {type: Number, default: 10},
        awardUponSubmit : {type: Boolean, default: true},
        comments: [
          { posted: { type: Date, default: Date.now },
            author: {type: Schema.Types.ObjectId, ref: 'User'},
            content: String 
          }
        ]
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Assignment', assignmentSchema);