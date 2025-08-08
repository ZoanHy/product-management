const Product = require('../../models/product.model.js');

const systemConfig = require('../../config/system.js')

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

    // console.log(objectPagination);


    const products = await Product.find(findProducts)
        .sort({ position: "desc" })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

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

    req.flash('success', `Cập nhật trạng thái thành công!`);

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
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "Out of Stock":
            await Product.updateMany({ _id: { $in: ids } }, { availabilityStatus: "Out of Stock" });
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "Delete All":
            // Xóa mềm
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() });
            // Xóa vĩnh viễn
            // await Product.deleteMany({ _id: { $in: ids } });
            req.flash('success', `Xóa thành công ${ids.length} sản phẩm!`);
            break;
        case "Change Position":
            // Chuyển đổi vị trí
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({ _id: id }, { position: position });
            }
            req.flash('success', `Cập nhật vị trí thành công ${ids.length} sản phẩm!`);
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
    req.flash('success', `Xóa thành công sản phẩm!`);

    // Xóa vĩnh viễn
    // await Product.deleteOne({ _id: id });

    const previousPage = req.get('Referrer') || '/';
    res.redirect(previousPage);
}

// [GET] /admin/products/create
module.exports.createItem = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm sản phẩm mới"
    });
}


// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    // Handle form submission

    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    const newProduct = new Product(req.body);
    await newProduct.save();

    req.flash('success', `Thêm sản phẩm thành công!`);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/edit/:id
module.exports.editItem = async (req, res) => {

    const id = req.params.id;
    const product = await Product.findOne({ _id: id, deleted: false });
    if (!product) {
        req.flash('error', `Sản phẩm không tồn tại!`);
        return res.redirect(`${systemConfig.prefixAdmin}/products`);
    }

    res.render("admin/pages/products/edit", {
        pageTitle: "Chỉnh sửa sản phẩm",
        product: product
    });
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await Product.updateOne({ _id: req.params.id }, req.body);
    } catch (error) {
        console.error('Error updating product:', error);
        req.flash('error', `Cập nhật sản phẩm thất bại!`);
        return
    }

    req.flash('success', `Cập nhật sản phẩm thành công!`);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/detail/:id
module.exports.detailItem = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id, deleted: false });
    if (!product) {
        req.flash('error', `Sản phẩm không tồn tại!`);
        return res.redirect(`${systemConfig.prefixAdmin}/products`);
    }

    res.render("admin/pages/products/detail", {
        pageTitle: product.title,
        product: product
    });
}