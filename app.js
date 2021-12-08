const express = require('express');
const logger = require('morgan');
const userRoute = require('./routes/user');

const app = express();

// Middlewares
app.use(logger('dev'));

//Routes
app.use('/user', userRoute)

//Start the server
const port = app.get('port') || 3000;
app.listen(port);