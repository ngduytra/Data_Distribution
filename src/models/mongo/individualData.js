const mongoose = require('mongoose')
const validator = require('validator')

const individualSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        require: true,
    },
    identityNumber:{
        type: Number,
        require: true
    },
    dob:{
        type: Date,
        default: Date.now,
    },
    address:{
        detail: {
            type: String,
            require: true
        },
        province: {
            type: String,
            require: true
        },
        country: {
            type: String,
            require: true
        }
    },
    gender:{
        type: String,
        require: true
    },

    job: {
        type: String,
        require: true
    },
    position:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
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
    isMarried: {
        type: Boolean,
        default: false
    },
    hobbies:{
        type: String,
        require: true,
    },
    isShared: {
        type: Boolean,
        default: false,
    }
})

const IndividualData = mongoose.model('IndividualData', individualSchema)
module.exports = IndividualData