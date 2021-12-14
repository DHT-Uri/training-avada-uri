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
 * @param data
 * @returns {{message: string, status: boolean}|{message, status: boolean}}
 */
function update(id, data) {
    try{
        const todoId = parseInt(id);
        const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
                return {...todos, ...data};
            }

            return todo;
        });

        return fs.writeFileSync('./src/database/todos.json', JSON.stringify({
            data: updatedTodos
        }));

    }catch (e) {
        return {
            status: false,
            message: e
        }
    }
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
    update,
    remove
};