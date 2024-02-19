const mongoose = require('mongoose')
const schema = mongoose.Schema({
    sentence:{
        type:String,
        required:true,
    },
    answer: {
        type: String,
        required: true,
        enum: ["a", "b", "c", "d"],
    },
    optionArray: {
        type: [String],
        required: true,
        default: [],
    },
},
{timestamps: true})

module.exports = mongoose.model('Test', schema)