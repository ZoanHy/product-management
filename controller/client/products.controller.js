const Product = require('../../models/product.model.js');

// [GET] /products

module.exports.index = async (req, res) => {
    const products = await Product.find({
        availabilityStatus: "In Stock",
        deleted: false
    }).sort({ position: "desc" });
    // console.log(products);

    const newProducts = products.map(item => {
        item.priceNew = (item.price - (item.price * item.discountPercentage / 100)).toFixed(0);
        return item;
    });

    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts,
    });
}

// [GET] /products/:slug
module.exports.viewDetail = async (req, res) => {
    const slug = req.params.slug;

    const product = await Product.findOne({ slug, deleted: false, availabilityStatus: "In Stock" });

    if (!product) {
        return res.status(404).render("404", { pageTitle: "Không tìm thấy sản phẩm" });
    }

    res.render("client/pages/products/detail", {
        pageTitle: product.title,
        product,
    });
};