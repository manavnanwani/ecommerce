const mongoose = require('mongoose');
// Schema
const wishlistDataSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    product: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const wishlist = mongoose.model('wishlist', wishlistDataSchema)
module.exports = wishlist