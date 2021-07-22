const mongoose = require('mongoose');
// Schema
const reviewsproductDataSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    userprofilepic: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const reviewsproduct = mongoose.model('reviewsproduct', reviewsproductDataSchema)
module.exports = reviewsproduct