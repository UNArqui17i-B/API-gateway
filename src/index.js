'use strict';

const express = require('express');
const status = require('http-status');
const logger = require('morgan');
const bodyParser = require('body-parser');

let app = express();

// config
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const User = require('./models/user');
User.checkDB((err) => {
    // eslint-disable-next-line no-console
    if (err) console.error(err);
});

// routes
app.use('/users', require('./services/user')(User));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = status.NOT_FOUND;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || status.INTERNAL_SERVER_ERROR);
    res.send({'error': err.message});
});

app.listen(4000);

