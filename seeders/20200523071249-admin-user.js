'use strict';

const constants = require('../config/constants');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
          user_id: uuidv4(),
          user_type: constants.USER_TYPE.ADMIN,
          userName: 'administrator',
          password: '@admin',
          createdAt: new Date(),
          updatedAt: new Date()
      }])
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
