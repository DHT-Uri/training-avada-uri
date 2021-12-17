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
 * @param ids
 * @returns {*}
 */
function getMultiple(ids) {
    return todos.map(todo => {
        if (ids.includes((todo.id).toString())) {
            return todo;
        }

        return null;
    }).filter(todo => todo !== null);
}

/**
 *
 * @param ids
 * @param data
 */
function putMultiple(ids, data) {
    const updatedTodos = todos.map(todo => {
        if (ids.includes((todo.id).toString())) {
            const newData = data.find(dt => dt.id === todo.id);
            return {...todo, ...newData};
        }

        return todo;
    });

    return fs.writeFileSync('./src/database/todos.json', JSON.stringify({
        data: updatedTodos
    }));
}

/**
 *
 * @param ids
 */
function removeMultiple(ids) {
    const updatedTodos = todos.filter(todo => !ids.includes((todo.id).toString()));

    return fs.writeFileSync('./src/database/todos.json', JSON.stringify({
        data: updatedTodos
    }));
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
 * @returns {{message, status: boolean}|void}
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
    getMultiple,
    putMultiple,
    removeMultiple,
    add,
    update,
    remove
};