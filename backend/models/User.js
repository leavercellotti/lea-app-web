const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    subscription:{
        type:String,
        maxlength:100,
    },
    level:{
        type:Number,
    },
    podcastsListenedArray: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Podcast',
        },
    ],
    podcastsLikedArray: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Podcast',
        },
    ],
},
{timestamps: true})

module.exports = mongoose.model('User', userSchema)