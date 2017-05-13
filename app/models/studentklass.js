// load the things we need
var mongoose = require('mongoose'), Schema = mongoose.Schema;

// define the schema for our klass model
var studentKlassSchema = mongoose.Schema({

        klassId     :  {type: Schema.Types.ObjectId, ref: 'Klass'},
        studentId   :   {type: Schema.Types.ObjectId, ref: 'User'},
        joinDate    : Date,
        exitDate    : Date, 
        points      : {type: Number,  default: 0},
        level       : Number
        }  , {
            timestamps : true                                    
        });

studentKlassSchema.index({klassId: 1, studentId: 1}, {unique: true});

// create the model for users and expose it to our app
module.exports = mongoose.model('StudentKlass', studentKlassSchema);