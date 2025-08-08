const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    discountPercentage: Number,
    stock: Number,
    availabilityStatus: String,
    thumbnail: String,
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
    position: Number,
    slug: { type: String, slug: "title", unique: true }
}, {
    timestamps: true
});
const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;