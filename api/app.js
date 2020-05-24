'use strict'

/*
 * Get env settings
 */
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/*
 * Express App
 */
const express = require('express');
const app = express();

/*
 * Body Parser
 */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
 * Passport
 */
const passport = require('passport');
const session = require('express-session');

module.exports = (db) => {
    // Api routes
    app.use('/api', require('./api')(db));
    // Initialise passport
    const initializePassport = require('../config/passport');
    initializePassport(passport, db);

    app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    return app;
}