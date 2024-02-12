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
    subscription:{//free ou paid
        type:String,
        maxlength:100,
        default: "free",
    },
    level: {
        type: String,
        enum: ["A1", "A2", "B1", "B2", "C"],
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
    nbDownloadedPodcastsToday: {
        type:Number,
        default: 0,
    },
    nbLearnedCards: {
        type:Number,
        default: 0,
    },
    viewedCards: [
        {
            cardId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Card',
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
            knowledge: {
                type: Boolean,
            }
        },
    ],
},
{timestamps: true})

module.exports = mongoose.model('User', userSchema)