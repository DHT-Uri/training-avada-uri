const fs = require('fs');
const {data: todos} = require("./todos.json");

/**
 *
 * @returns {*}
 */
function getAll() {
    return todos;
}

/**
 *
 * @param data
 */
function add(data) {
    const updatedTodos = [data, ...todos];
    return fs.writeFileSync('./src/database/todos.json', JSON.stringify({
        data: updatedTodos
    }));
}

/**
 *
 * @param id
 */
function remove(id) {
    const todoId = parseInt(id);
    const updatedTodos = todos.filter(todo => todo.id !== todoId);

    return fs.writeFileSync('./src/database/todos.json', JSON.stringify({
        data: updatedTodos
    }));
}

module.exports = {
    getAll,
    add,
    remove
};