const Router = require('koa-router');

const bookHandler = require('../handlers/books/bookHandlers');
const bookInputMiddleware = require('../middleware/bookInputMiddleware.js');

const productHandler = require('../handlers/books/productHandlers');
const productInputMiddleware = require('../middleware/productInputMiddleware.js');

// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

//Routes of book
router.get('/books', bookHandler.getBooks);
router.get('/books/:id', bookHandler.getBook);
router.post('/books', bookInputMiddleware, bookHandler.save);

//Routes of product
router.get('/product/prepare', productHandler.prepare);
router.get('/products', productHandler.getProducts);
router.get('/products/:id', productHandler.getProduct);
router.post('/products', productInputMiddleware, productHandler.save);

module.exports = router;