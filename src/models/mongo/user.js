var mongoose = require('mongoose');
var validator = require('validator');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        index: {
            unique: true,
            partialFilterExpression: { email: {$type: 'string'}}
        },
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
          }
    },
    nickName: {
        type: String,
        trim: true,
    },
    userName: {
        type: String,
        trim: true,
        index: {
            unique: true,
            sparse: true
        },
    },
    phone: {
        type: String,
        trim: true,
        index: {
            unique: true,
            partialFilterExpression: {phone: {$type: 'string'}}
        },
        validate:{
            validator: validator.isMobilePhone,
            message: '{VALUE} is not a valid mobile phone',
            isAsync: false
          }
    },
    is_confirm_email: {
        type: Boolean,
        default: false,
    },
    
    is_verify: {
        type: Boolean,
        default: false,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    validateUser : [String],
    
    addressEthereum: {
        type: String,
        trim: true,
    },
    validateFile : [String],
    facebook: {
        type: String,
        trim: true,
    },
    
    password_hash: {
        type: String,
        trim: true,
        require: true,
    },
    status_id: {
        type: Number,
        default: 1,
    },
    avatar: {
        type: String,
        trim: true,
        default: "QmcvpremCh4FPWGDe28auWBcsS9J1jy7Es5N155e4A6mJi"
    },
    coverPhoto: {
        type: String,
        trim: true,
        default: "Qmep9sYxFwJokmCpjj6ZtjmdRZSV7mYeBNnbxbJcekgnYd"
    },
    birthday: {
        type: Date,
    },
    genre: {
        type: Number,
        default: 1,
    },
    view: {
        type: Number,
        default: 0,
    },
    date_created: {
        type: Date,
        default: Date(Date.now()),
    },
    date_updated: {
        type: Date,
        default : Date(Date.now()),
    },
    socketID: {
        type: String,
        trim: true,
        default: ''
    },
    refreshToken: {
        type: String,
        trim: true,
    },
    personInbox: [String],
    privateKey: {
        type: String,
        trim: true,
    },
    addressEthereum: {
        type: String,
        trim: true,
    },
    facebook: {
        type: String,
        trim: true,
    },
    youtube: {
        type: String,
        trim: true,
    },
    home: {
        type: String,
    },
    isValid: {
        type: Boolean,
        default: false
    },
});

userSchema.pre('save', next => {
    if(this.isNew || this.isModified) {
        this.date_updated = Date(Date.now());
    }
    return next();
});

module.exports = mongoose.model('User', userSchema);