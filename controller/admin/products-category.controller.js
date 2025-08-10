module.exports.index = async (req, res) => {
    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
    })
}

module.exports.create = async (req, res) => {
    res.render("admin/pages/products-category/create", {
        pageTitle: "Thêm mới danh mục sản phẩm",
    })
}