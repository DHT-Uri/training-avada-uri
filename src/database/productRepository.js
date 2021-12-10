const fs = require('fs');
const faker = require('faker');
const {data: products} = require('./products.json');
const productInputMiddleware = require('../middleware/productInputMiddleware.js');

faker.locale = "de";

/**
 *
 * @param productData
 * @param sort
 * @returns {*}
 */
function groupByProduct(productData, sort) {
    if (sort === 'desc') {
        return productData.sort((a, b) => {
            // return  a.name.localeCompare(b.name); //String
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }else{
        return productData.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
    }
}

/**
 *
 * @param fields
 * @param productData
 * @returns {*}
 */
function getProductWithFields(fields = '', productData) {
    const arrFields = fields.split(",");
    const arrKey = Object.keys(productData[0]);

    const productFields = arrKey.map(key => {
        return arrFields.find(field => field === key);
    }).filter(fl => fl !== undefined);

    if (productFields.length === 0){
        return productData;
    }else{
        return productData; //WithFields
    }

}

/**
 *
 * @returns {*}
 */
function getAll(sort, fields) {
    try {
        const productData = getProductWithFields(fields, products);

        if(sort){
            try {
                return groupByProduct(productData, sort)
            }catch (e){
                console.log(e);
            }
        }

        return productData;
    }catch (e) {
        console.log(e);
    }
}

/**
 *
 * @param limit
 * @param sort
 */
function getFilteredProducts(limit = 1, sort) {
    try {
        const productData = products.map((product, i) => {
            if (i < limit) {
                return product;
            }
            return null;
        }).filter(product => {
            return product !== null;
        });

        return groupByProduct(productData, sort);
    }catch (e) {
        console.log(e);
    }
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


function update(id, data) {
    try{
        const productId = parseInt(id);
        const productsWithoutId = products.filter(product => product.id !== productId);

        const newData = {id: productId, ...data};
        const updatedProducts = [...productsWithoutId, newData];

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
 *
 * @param i
 * @returns data
 */
function getFakeData(i) {
    return new Promise((resolve, reject) => {
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
        resolve(data);
    });
}

/**
 *
 * @returns {Promise<boolean>}
 */
async function prepareData () {
    let newProducts = [];

    for (let i = 1; i <= 10; i++) {
        const data = await getFakeData(i);
        newProducts = [ ...newProducts, data];
    }

    try {
        fs.writeFileSync('./src/database/products.json', JSON.stringify({
            data: newProducts
        }));
    } catch (e) {
        console.error(e);
        return false;
    }

    return true;
};


module.exports = {
    getOne,
    getAll,
    getFilteredProducts,
    add,
    update,
    remove,
    prepareData
};