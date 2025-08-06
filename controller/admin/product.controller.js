const Product = require('../../models/product.model.js');

const filterStatusHelper = require('../../helpers/filterStatus.js');
const searchHelper = require('../../helpers/search.js');
const objectPaginationHelper = require('../../helpers/pagination.js');

// [GET] /admin/products
module.exports.index = async (req, res) => {

    // Filter status helper
    const filterStatus = filterStatusHelper(req.query);

    // console.log(req.query.availabilityStatus);

    let findProducts = {
        deleted: false,
        // title: "Red Lipstick"
    }

    if (req.query.availabilityStatus) {
        findProducts.availabilityStatus = req.query.availabilityStatus;
    }

    // Search helper
    const objectSearch = searchHelper(req.query);

    if (objectSearch.regex) {
        findProducts.title = objectSearch.regex; // Apply the regex for case-insensitive search
    }

    // Pagination

    const countProducts = await Product.countDocuments(findProducts);

    let objectPagination = objectPaginationHelper({
        currentPage: 1,
        limitItems: 5
    }, req.query, countProducts);

    console.log(objectPagination);


    const products = await Product.find(findProducts).limit(objectPagination.limitItems).skip(objectPagination.skip);

    // console.log(products);

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    })
}