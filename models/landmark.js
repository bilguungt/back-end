var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment')
var Schema = mongoose.Schema;
var landmarkSchema = new Schema({
    _id: {
        type: String,
        index: true,
        require: true
    },
    name: {
        type: String,
        require: true    
    },
    image: {
        type: String,
        require: true    
    },

    longtitude: {
        type:  Number,
        require: true
    },
    laititude: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
   
    location: {
        type: String,
        require: true
    },
    rating: {
        type: Number
    },
    rCount: {
        type: Number
    }
   
})

autoIncrement.initialize(mongoose.connection); 

landmarkSchema.plugin(autoIncrement.plugin, 'LandMark');
module.exports = mongoose.model('LandMark', landmarkSchema)