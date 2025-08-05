const homeRouter = require('./home.route.js');
const productRouter = require('./products.route.js');

module.exports = (app) => {
    app.use('/', homeRouter);
    app.use('/products', productRouter);

}


