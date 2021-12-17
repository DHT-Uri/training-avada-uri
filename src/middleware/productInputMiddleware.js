const yup = require('yup');
const {data: products} = require("../database/products.json");

/**
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function productInputMiddleware(ctx, next) {
    try {
        const postData = ctx.request.body;

        if (typeof postData.createdAt === 'undefined' || postData.createdAt === null) {
            postData.createdAt = new Date();
        }

        let schema = yup.object().shape({
            id: yup.number().positive().integer().required(),
            name: yup.string().required(),
            price: yup.number().required(),
            description: yup.string().required(),
            product: yup.string().required(),
            color: yup.string().required(),
            createdAt: yup.string().required(),
            image: yup.string().required()
        });

        await schema.validate(postData);
        next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        }
    }
}

/**
 *
 * @param ctx
 * @param next
 * @returns {Promise<{message: string, status: string}>}
 */
async function productUpdateMiddleware(ctx, next) {
    try {
        const postData = ctx.request.body;
        const {id} = ctx.params;
        const currentProduct = products.find(product => product.id === parseInt(id));

        if (typeof currentProduct === 'undefined' || currentProduct === null) {
            return ctx.body = {
                status: 'Error!',
                message: 'The product does not exist!'
            }
        }

        if (typeof postData.createdAt === 'undefined' || postData.createdAt === null) {
            postData.createdAt = new Date();
        }

        let schema = yup.object().shape({
            name: yup.string().required(),
            price: yup.number().required(),
            description: yup.string().required(),
            product: yup.string().required(),
            color: yup.string().required(),
            createdAt: yup.string().required(),
            image: yup.string().required()
        });

        await schema.validate(postData);
        next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        }
    }
}


module.exports = {
    productInputMiddleware: productInputMiddleware,
    productUpdateMiddleware: productUpdateMiddleware
};