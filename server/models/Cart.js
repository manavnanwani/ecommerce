const mongoose = require('mongoose');
// Schema
const cartsDataSchema = new mongoose.Schema({
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
const carts = mongoose.model('carts', cartsDataSchema)
module.exports = carts