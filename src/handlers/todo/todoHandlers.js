const {getAll: getAll, add: add, remove: remove} = require("../../database/todoReponsitory");

/**
 *
 * @param ctx
 * @returns {Promise<(function(): *)|*>}
 */
async function getTodos(ctx) {
    try {
        ctx.body = {
            data: getAll()
        };
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{message, status: string}|{message: string, status: string}>}
 */
async function addTodo(ctx) {
    try {
        const postData = ctx.request.body;
        add(postData);
        return {
            status: "Success",
            message: "Product added successfully!"
        }
    } catch (e) {
        return {
            status: "Error",
            message: e
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{message, status: string}|{message: string, status: string}>}
 */
async function removeTodo(ctx){
    try {
        const {id} = ctx.params;
        remove(id);
        return {
            status: "Success",
            message: "Product has been removed!"
        }
    } catch (e) {
        return {
            status: "Error",
            message: e
        }
    }
}

module.exports = {
    getTodos,
    addTodo,
    removeTodo
};