const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const userRoute = require('./routes/user');

const app = express();

// Middlewares
app.use(logger('dev'));

//Routes
app.use('/user', userRoute)

async function getUser() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        return response.data;
    } catch (error) {
        return {
            error: error
        }
    }
}

//Start the server
const port = app.get('port') || 3000;
app.listen(port);

app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is so good!'
    });
})
getUser();