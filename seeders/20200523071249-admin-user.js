'use strict';
const constants = require('../config/constants');
const helpers = require('../helpers');

const uuid = helpers.api.generateId();
let adminPassword = '@admin123';
const hashPassword = helpers.api.hashPassword(adminPassword);

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
          userId: uuid,
          userType: constants.USER_TYPE.ADMIN,
          userName: 'administrator',
          password: hashPassword,
          createdAt: new Date(),
          updatedAt: new Date()
      }])
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
