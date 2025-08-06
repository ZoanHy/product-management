const Product = require('../../models/product.model.js');

// [GET] /admin/products

module.exports.index = async (req, res) => {

    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Còn hàng",
            status: "In Stock",
            class: ""
        },
        {
            name: "Hết hàng",
            status: "Out of Stock",
            class: ""
        }
    ]

    if (req.query.availabilityStatus) {
        const index = filterStatus.findIndex(item => item.status == req.query.availabilityStatus);
        filterStatus[index].class = "active";


        // filterStatus.forEach(item => {
        //     if (item.status === req.query.availabilityStatus) {
        //         item.class = "active";
        //     } else {
        //         item.class = "";
        //     }
        // });
    } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";

    }

    // console.log(req.query.availabilityStatus);

    let findProducts = {
        deleted: false
    }

    if (req.query.availabilityStatus) {
        findProducts.availabilityStatus = req.query.availabilityStatus;
    }

    const products = await Product.find(findProducts);

    // console.log(products);

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus
    })
}