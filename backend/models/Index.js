const mongoose = require('mongoose')
const indexSchema = mongoose.Schema({
    index:{
        type:Number,
        required:true,
    },
    level:{
        type:Number,
        required:true,
        enum: [1, 2, 3],
    },
},
{timestamps: true})

module.exports = mongoose.model('IndexPrompt', indexSchema)