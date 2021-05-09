var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment')
var Schema = mongoose.Schema;
var reviewSchema = new Schema({
    _id: {
        type: String,
        index: {
            unique: true,
        }, 
        require: true
    },
    userId: {
        type: Number,
        require: true  
    },
    userName: {
        type: String,
        require: true  
    },
    avatar: {
        type: String,
        require: true  
    },
    companyId: {
        type:  Number,
        require: true    
    },
    content: {
        type:  String,   
    },
    star: {
        type:  Number,
        require: true    
    },
    dateCreated: {
        type:  Date,
        require: true    
    },
})

autoIncrement.initialize(mongoose.connection); 

reviewSchema.plugin(autoIncrement.plugin, 'Reviews');
module.exports = mongoose.model('Reviews', reviewSchema)