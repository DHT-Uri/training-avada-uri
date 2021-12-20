const Router = require('koa-router');
const helloWorldController = require('../handlers/controllers/helloWorldController');
const todoController = require("../handlers/controllers/todoController");

// Prefix all routes with /books
const router = new Router({
  prefix: '/api'
});

// Routes will go here
router.get('/helloworld', helloWorldController.hello);

//Todos
router.get('/todos', todoController.getTodos);
router.post('/todos', todoController.addTodo);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todo/:id', todoController.removeTodo);

module.exports = router;
