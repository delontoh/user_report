'use strict'

const path = require('path');
const port = 3000;
const Sequelize = require('sequelize').Sequelize;

/**
 * Initialise ORM
 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'data/database.sqlite')
});

/**
 * Server Activation
 */
const app = require('./api/app')(sequelize);
app.listen(port, () => console.log(`App started and listening on port ${port}`));