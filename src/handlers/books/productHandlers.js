const {getAll: getAllProducts, getOne: getOneProduct, getFilteredProducts: getFilteredProducts, add: addProduct, prepareData: prepareProducts} = require("../../database/productRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
    try {
        const {limit, sort} = ctx.query;
        const products = getAllProducts(sort);

        if (limit) {
            // console.log(products);
            ctx.body = {
                data: getFilteredProducts(limit, sort)
            };

        }else{
            ctx.body = {
                data: products
            };
        }
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

        ctx.status = 404;
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

async function prepare(ctx) {
    try {
        const prepare = prepareProducts();
        if (prepare) {
            ctx.status = 201;
            return ctx.body = {
                status: 'Success!',
                message: '1000 products have been added!'
            };
        }else{
            return ctx.body = {
                status: 'Error!',
                message: 'The error has occurred!'
            }
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
    save
};