const Product = require('../../models/product.model.js');

const filterStatusHelper = require('../../helpers/filterStatus.js');
const searchHelper = require('../../helpers/search.js');

// [GET] /admin/products
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query);

    // console.log(req.query.availabilityStatus);

    let findProducts = {
        deleted: false,
        // title: "Red Lipstick"
    }

    if (req.query.availabilityStatus) {
        findProducts.availabilityStatus = req.query.availabilityStatus;
    }

    // let keyword = "";
    // if (req.query.keyword) {
    //     keyword = req.query.keyword;
    //     findProducts.title = { $regex: keyword, $options: "i" }; // Case-insensitive search using regex
    // }


    const objectSearch = searchHelper(req.query);

    if (objectSearch.regex) {
        findProducts.title = objectSearch.regex; // Apply the regex for case-insensitive search
    }

    const products = await Product.find(findProducts);

    // console.log(products);

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
}