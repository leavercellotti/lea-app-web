const mongoose = require('mongoose')
const promptiaSchema = mongoose.Schema({
    level:{
        type:Number,
        required:true,
        enum: [1, 2, 3],
    },
    sentence: { 
        type: String, 
        required: true,
    },
},
{timestamps: true})

module.exports = mongoose.model('PromptIA', promptiaSchema)