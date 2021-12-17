const {getOne: getOneProduct, getProducts: getAll, add: addProduct, update: updateProduct, remove: removeProduct, prepareData: prepareProducts} = require("../../database/productRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
    try {
        const {sort, limit, fields} = ctx.query;
        ctx.body = {
            data: getAll({sort, limit, fields})
        };
    } catch (e) {
        ctx.status = 404;
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
 * @returns {Promise<{data: {author: string, name: string, id: number}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getProduct(ctx) {
    try {
        const {id} = ctx.params;
        const getCurrentProduct = getOneProduct(id);

        if (getCurrentProduct) {
            return ctx.body = {
                data: getCurrentProduct
            }
        }

        return ctx.body = {
            status: 'error!',
            message: 'Product Not Found with that id!'
        };
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
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function save(ctx) {
    try {
        const postData = ctx.request.body;
        addProduct(postData);

        ctx.status = 201;
        return ctx.body = {
            success: true
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
 * @returns {{success: boolean, error}|{success: boolean}}
 */
async function update(ctx){
    try {
        const postData = ctx.request.body;
        const {id} = ctx.params;
        const update = updateProduct(id, postData);

        if (update.status) {
            ctx.status = 201;
            return ctx.body = {
                success: true,
                message: update.message
            }
        }

        return ctx.body = {
            success: false,
            error: update.message
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
 * @returns {Promise<{success: boolean, message: string}|{success: boolean, error}|{success: boolean, error: string}>}
 */
async function remove(ctx){
    try {
        const {id} = ctx.params;
        const remove = removeProduct(id);

        if (remove.status) {
            ctx.status = 201;
            return ctx.body = {
                success: true,
                message: remove.message
            }
        }
        return ctx.body = {
            success: false,
            error: remove.message
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
 * @returns {{success: boolean, error}|{message: string, status: string}}
 */
function prepare(ctx) {
    try {
        const prepare = prepareProducts();
        if (prepare) {
            ctx.status = 201;
            return ctx.body = {
                status: 'Success!',
                message: '1000 products have been added!'
            };
        }

        return ctx.body = {
                status: 'Error!',
                message: 'The error has occurred!'
        }

    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

module.exports = {
    getProducts,
    getProduct,
    prepare,
    save,
    remove,
    update
};