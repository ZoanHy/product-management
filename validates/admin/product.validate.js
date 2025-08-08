
module.exports.createPost = (req, res, next) => {
    const previousPage = req.get('Referrer') || '/';

    if (!req.body.title || !req.body.price || !req.body.stock) {
        req.flash('error', 'Vui lòng điền đầy đủ thông tin sản phẩm!');
        res.redirect(previousPage);
        return;
    }

    // console.log('ok');
    next();
}