const mongoose = require('mongoose')

const fileInNeedSchema = new mongoose.Schema({
    idEthereum:{
        type: Number,
        default: 0,
    },
    idHuntedFile: {
        type: Number,
        default: 0,
    },
    needer: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    finder: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    field: {
        type: String,
        required: true,
    },
    rowAmount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    fee: {
        type: Number,
        required: true
    },
    isHunted: {
        type: Boolean,
        default: false
    }
})

const FileInNeed = mongoose.model('Feedback', fileInNeedSchema)
module.exports = FileInNeed