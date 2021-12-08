const fs = require('fs');
const {data: products} = require('./products.json');



function getAll(limit, orderBy) {
    try {
        return products.limit(limit).orderBy(orderBy);
    }catch (e) {
        console.log(e);
    }
}

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

module.exports = {
    getOne,
    getAll,
    add
};