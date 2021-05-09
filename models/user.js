var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment')
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema;
var userSchema = new Schema({
    _id: {
        type: String,
        index: true,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true    
    },
    email: {
        type: String,
        index: {
            unique: true,
        },
        require: true
    },
    avatar: {
        type: String,
        require: true    
    },

    role: {
        type: Number,
        require: true
    },
    pin: {
        type: String,
        require: true
    },

    fav: {
        type: Object,
        require: false
    }

})

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('pin') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                console.log(err);
                return next(err)
            }
            bcrypt.hash(user.pin.toString(), salt, function (err, hash) {
                if (err) {
                    console.log(err);
                    return next(err)
                }
                user.pin = hash;
                next()
            })
        })
    }
    else {
        return next()
    }
})

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.pin, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}
autoIncrement.initialize(mongoose.connection); 

userSchema.plugin(autoIncrement.plugin, 'User');
module.exports = mongoose.model('User', userSchema)