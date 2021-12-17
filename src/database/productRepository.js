const fs = require('fs');
const faker = require('faker');
const {data: products} = require('./products.json');

faker.locale = "de";

/**
 *
 * @param sort
 * @param limit
 * @param fields
 * @returns {*}
 */
function getProducts ({sort, limit , fields}) {
    let finalProducts = products;

    if (sort) {
        if (sort === 'desc') {
            finalProducts = finalProducts.sort((a, b) => {
                // return  a.name.localeCompare(b.name); //String
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
        }else {
            finalProducts = finalProducts.sort((a, b) => {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            });
        }
    }

    if (limit) {
        finalProducts = finalProducts.map((product, i) => {
            if (i < limit) {
                return product;
            }
            return null;
        }).filter(product => {
            return product !== null;
        });
    }

    if(fields) {
        const arrFields = fields.split(",");
        const arrKey = Object.keys(finalProducts[0]);

        const productFields = arrKey.map(key => {
            return arrFields.find(field => field === key);
        }).filter(fl => fl !== undefined);

        if (productFields.length !== 0){
            finalProducts = finalProducts.map(product => {
               return pick(product, productFields);
            });
        }
    }

    return finalProducts;
}

/**
 *
 * @param object
 * @param keys
 * @returns {*}
 */
function pick(object, keys) {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
}

/**
 *
 * @param id
 */
function getOne(id) {
    return products.find(product => product.id === parseInt(id));
}

/**
 *
 * @param data
 */
function add(data) {
    const updatedProducts = [...products, data];
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updatedProducts
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
        const productId = parseInt(id);
        const updatedProducts = products.map(product => {
           if (product.id === productId) {
               return {...product, ...data};
           }

           return product;
        });

        fs.writeFileSync('./src/database/products.json', JSON.stringify({
            data: updatedProducts
        }));

        return {
            status: true,
            message: "The product has been updated!"
        }
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
 * @returns {{message: string, status: boolean}|{message, status: boolean}}
 */
function remove(id) {
    try{
        const productId = parseInt(id);
        const productsWithoutId = products.filter(product => product.id !== productId);

        fs.writeFileSync('./src/database/products.json', JSON.stringify({
            data: productsWithoutId
        }));

        return {
            status: true,
            message: "The product has been removed!"
        }
    }catch (e) {
        return {
            status: false,
            message: e
        }
    }
}

/**
 * return data
 */
function prepareData () {
    let newProducts = [];

    for (let i = 1; i <= 10; i++) {
        const data = {
            "id": i,
            "name": faker.commerce.productName(),
            "price": faker.commerce.price(),
            "description": faker.commerce.productDescription(),
            "product": faker.commerce.productAdjective(),
            "color": faker.commerce.color(),
            "createdAt": faker.datatype.datetime(),
            "image": faker.image.imageUrl()
        };
        newProducts = [ ...newProducts, data];
    }

    try {
        return fs.writeFileSync('./src/database/products.json', JSON.stringify({
            data: newProducts
        }));
    } catch (e) {
        console.error(e);
    }
};


module.exports = {
    getOne,
    getProducts,
    add,
    update,
    remove,
    prepareData
};