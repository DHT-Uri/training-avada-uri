const fs = require('fs');
const faker = require('faker');
const {data: products} = require('./products.json');

faker.locale = "de";

function groupByProduct(productDb, sort) {
    if (sort === 'desc') {
        return productDb.sort((a, b) => {
            // return  a.name.localeCompare(b.name); //String
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }else{
        return productDb.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
    }
}

/**
 *
 * @returns {*}
 */
function getAll(sort) {
    try {
        if(sort){
            try {
                return groupByProduct(products, sort);
            }catch (e){
                console.log(e);
            }
        }

        return products;


    }catch (e) {
        console.log(e);
    }
}

/**
 *
 * @param limit
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
    const updatedProducts = [data, ...products];
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updatedProducts
    }));
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

    for (let i = 1; i <= 1000; i++) {
        const data = await getFakeData(i);
        newProducts = [ ...newProducts, data];
    }

    const updatedProducts = [...newProducts, products]
    try {
        fs.writeFileSync('./src/database/products.json', JSON.stringify({
            data: updatedProducts
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
    prepareData
};