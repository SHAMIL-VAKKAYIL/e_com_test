const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productimage: {
        type: String,
        required: true
    },
    prodctname: {
        type: String,
        required: true
    },
    productprice: {
        type: Number,
        required: true
    },
    productcompany: {
        type: String,
        required: true
    },
    productdesc: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Product', productSchema);