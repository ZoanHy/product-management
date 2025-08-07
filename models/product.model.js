const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: String,
    price: { type: Number, required: true },
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,
    dimensions: {
        width: Number,
        height: Number,
        depth: Number
    },
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    returnPolicy: String,
    minimumOrderQuantity: Number,
    thumbnail: String,
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
    position: Number
});
const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;