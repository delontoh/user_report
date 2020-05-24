'use strict';
const constants = require('../config/constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
          userId: 'admin123456',
          userType: constants.USER_TYPE.ADMIN,
          userName: 'administrator',
          password: '@admin123',
          createdAt: new Date(),
          updatedAt: new Date()
      }])
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
