const express = require('express');
const morgan = require('morgan');  // Logging middleware

const { errorRespond, LogError} = require('./errors/error_mw');
const healthCheck = require('./routes/healthCheck');
const mongoHealthCheck = require('./routes/mongoHealthCheck');
const distance = require('./routes/distance');
const popularSearch = require('./routes/search');


express.json();
express.urlencoded();
const app = express();

app.use(morgan())

//API middlewares
app.use(distance.PATH, distance.router);
app.use(healthCheck.PATH, healthCheck.router);
app.use(mongoHealthCheck.PATH, mongoHealthCheck.router);
app.use(popularSearch.PATH, popularSearch.router);


//Error middlewares
app.use('*',LogError);
app.use('*',errorRespond);


module.exports = app;