// import fetch from 'node-fetch';
const axios = require('axios');

const getAllUsers = (req, res) => {
    axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
        responseType: 'json'
    })
        .then(function (response) {
            return res.status(200).json({
                data: response.data
            });
        });
}

const getUser = async (req, res) => {
    axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
        params: {
            id: 1
        },
        responseType: 'json'
    })
        .then(function (response) {
            return res.status(200).json({
                userData: response.data
            });
        });
}

module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser
};