var mongoose = require('mongoose');

var SurveySchema = mongoose.Schema({

    idSolidity: {
        type: Number,
        default: false
    },
    name:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },

    amountDemand: {
        type: Number,
        require: true
    },

    feePerASurvey: {
        type: Number,
        default: 0,
    },

    ownerID: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    content:[{
        question:{
            type: String
        },
        answer:[String]
    }],
    contentHash:{
        type: String
    },

    date_created: {
        type: Date,
        default: Date(Date.now()),
    },
    date_end: {
        type: Date,
        default: Date(Date.now()+3600),
    },


    timeAmount: {
        type: Number,
        default: 2629743 //30days
    },

    isExpired: {
        type: Boolean,
        default: false,
    },

});

SurveySchema.pre('save', next => {
    if(this.isNew || this.isModified) {
        this.date_updated = Date(Date.now());
    }
    return next();
});

module.exports = mongoose.model('Survey', SurveySchema);