const Router = require('koa-router');

const bookHandler = require('../handlers/books/bookHandlers');
const bookInputMiddleware = require('../middleware/bookInputMiddleware.js');

const productHandler = require('../handlers/products/productHandlers');
const productInputMiddleware = require('../middleware/productInputMiddleware.js');

const todoHandler = require("../handlers/todo/todoHandlers");

// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

//Routes of book
router.get('/books', bookHandler.getBooks);
router.get('/books/:id', bookHandler.getBook);
router.post('/books', bookInputMiddleware, bookHandler.save);

//Routes of product
router.get('/product/prepare', productHandler.prepare); //Add sample data
router.get('/products', productHandler.getProducts);
router.get('/products/:id', productHandler.getProduct);
router.post('/products', productInputMiddleware.productInputMiddleware, productHandler.save);
router.put('/products/:id', productInputMiddleware.productUpdateMiddleware, productHandler.update);
router.del('/products/:id', productHandler.remove);

//Routes of todos
router.get('/todos', todoHandler.getTodos);
router.post('/todos', todoHandler.addTodo);
router.put('/todos/:id', todoHandler.updateTodo);
router.del('/todo/:id', todoHandler.removeTodo);

module.exports = router;