const mongoose = require('mongoose');
// Schema
const commentsDataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        required: true
    },
    comment: {
        type: Array,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const comments = mongoose.model('comments', commentsDataSchema)
module.exports = comments