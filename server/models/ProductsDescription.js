const mongoose = require('mongoose');
// Schema
const productsdescriptionDataSchema = new mongoose.Schema({
    category: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    instocks: {
        type: String,
        required: false
    },
    onsale: {
        type: String,
        required: false
    },
    freeshipping: {
        type: String,
        required: false
    },
    freereturn: {
        type: String,
        required: false
    },
    shipfrom: {
        type: String,
        required: false
    },
    length: {
        type: Number,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    blackowned: {
        type: String,
        required: false
    },
    producttype: {
        type: String,
        required: false
    },
    origin: {
        type: String,
        required: false
    },
    texture: {
        type: String,
        required: false
    },
    basematerial: {
        type: String,
        required: false
    },
    lacetype: {
        type: String,
        required: false
    },
    preplucked: {
        type: String,
        required: false
    },
    bleachedKnots: {
        type: String,
        required: false
    },
    babyHairs: {
        type: String,
        required: false
    },
    parting: {
        type: String,
        required: false
    },
    closureSize: {
        type: String,
        required: false
    },
    frontalSize: {
        type: String,
        required: false
    },
    density: {
        type: Number,
        required: false
    },
    product: {
        type: Object,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const productsdescription = mongoose.model('productsdescription', productsdescriptionDataSchema)
module.exports = productsdescription