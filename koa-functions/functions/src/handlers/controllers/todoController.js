const {getAll: getAll, add: add, update: update, remove: remove} = require("../../database/todoRepository");

/**
 *
 * @param ctx
 * @returns {Promise<(function(): *)|*>}
 */
async function getTodos(ctx) {
  try {
    ctx.body = {
      data: await getAll()
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
    const postStatus = add(postData);
    if (postStatus) {
      ctx.status = 201;
      return ctx.body = {
        success: true
      }
    }

    return ctx.body = {
      success: false,
      error: "Error"
    }
  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, message: (string|*)}|{success: boolean, error}|{success: boolean, error: (string|*)}>}
 */
async function updateTodo(ctx){
  try {
    const data = ctx.request.body;
    const {id} = ctx.params;
    update(id, data);

    ctx.status = 201;
    return ctx.body = {
      success: true,
      message: update.message
    }

  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message
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

    return ctx.body = {
      success: true,
      message: update.message
    }

  } catch (e) {
    return ctx.body = {
      success: false,
      error: e.message
    }
  }
}

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  removeTodo
};