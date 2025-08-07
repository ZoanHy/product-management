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

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    // console.log(req.params);
    const { status, id } = req.params;

    await Product.updateOne({ _id: id }, { availabilityStatus: status });

    const previousPage = req.get('Referrer') || '/';
    res.redirect(previousPage);
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    // console.log(req.body);

    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    // console.log(type);
    // console.log(ids);

    switch (type) {
        case "In Stock":
            await Product.updateMany({ _id: { $in: ids } }, { availabilityStatus: "In Stock" });
            break;
        case "Out of Stock":
            await Product.updateMany({ _id: { $in: ids } }, { availabilityStatus: "Out of Stock" });
            break;
    }

    const previousPage = req.get('Referrer') || '/';
    res.redirect(previousPage);

    // res.send('pk')
}


// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    // Xóa mềm
    await Product.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });

    // Xóa vĩnh viễn
    // await Product.deleteOne({ _id: id });

    const previousPage = req.get('Referrer') || '/';
    res.redirect(previousPage);
}