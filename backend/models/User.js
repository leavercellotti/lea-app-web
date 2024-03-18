const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        // required: true 
    },
    name: { 
        type: String
    },
    stripeId: { //customer id
        type: String
    },
    sessionId: {
        type:String
    },
    subscriptionId: {
        type: String
    },
    subscription:{//free ou paid
        type:String,
        maxlength:100,
        default: "free",
    },
    free: {
        type: Boolean,
    },
    current_period_end: {
        type: String,
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
    nbChatsMade: {
        type:Number,
        default: 0,
    },
    otp:{//free ou paid
        type:String,
        maxlength:100,
    },
},
{timestamps: true})

module.exports = mongoose.model('User', userSchema)