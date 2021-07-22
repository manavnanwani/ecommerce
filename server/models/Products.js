const mongoose = require('mongoose');
// Schema
const productsDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    url: {
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
const products = mongoose.model('products', productsDataSchema)
module.exports = products