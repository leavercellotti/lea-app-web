const mongoose = require('mongoose')
const podcastSchema = mongoose.Schema({
    link:{
        type:String,
        required:true,
        maxlength:300,
    },
    title:{
        type:String,
        required:true,
        maxlength:200,
    },
    transcription:{
        type:String,
        required:true,
    },
    translation:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isListened: {
        type: Boolean,
        default: false,
    },
    level:{
        type:Number,
        required:true,
        enum: [1, 2, 3],
    },
},
{timestamps: true})

module.exports = mongoose.model('Podcast', podcastSchema)