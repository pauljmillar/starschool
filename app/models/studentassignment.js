// load the things we need
var mongoose = require('mongoose'), Schema = mongoose.Schema;

// define the schema for our klass model
var studentAssignmentSchema = mongoose.Schema({

        assignmentId      :  {type: Schema.Types.ObjectId, ref: 'Assignment'},
        studentId         :   {type: Schema.Types.ObjectId, ref: 'User'},
        klassId           : {type: Schema.Types.ObjectId, ref: 'Klass'},
        pointsAwarded     : {type: Number,  default: 0},
        submittedDate     : Date,
        draftSavedDate    : Date,
        returnedDate      : Date,
        assignedDate      : {type: Date, default: Date.now},
        isSubmitted       : {type: Boolean, default: false},
        work              : String,
        note              : String,
        comments: [
          { posted: { type: Date, default: Date.now },
            author: {type: Schema.Types.ObjectId, ref: 'User'},
            content: String 
          }
        ]
        }  , {
            timestamps : true                                    
        });

studentAssignmentSchema.index({assignmentId: 1, studentId: 1}, {unique: true});

// create the model for users and expose it to our app
module.exports = mongoose.model('StudentAssignment', studentAssignmentSchema);