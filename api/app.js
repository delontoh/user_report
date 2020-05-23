'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

module.exports = (db) => {
    app.use('/api', bodyParser, require('./api')(db));
    return app;
}