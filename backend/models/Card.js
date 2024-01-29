const mongoose = require('mongoose')
const schema = mongoose.Schema({
    wordEnglish:{
        type:String,
        required:true,
        maxlength:200,
    },
    // translation c'est le mot en français
    wordFrench:{
        type:String,
        required:true,
        maxlength:200,
    },
    level: {
        type: String,
        required: true,
        enum: ["A1", "A2", "B1", "B2", "C"],
    },
    sentenceArray: {
        type: [String],
        default: [],
    },
},
{timestamps: true})

module.exports = mongoose.model('Card', schema)