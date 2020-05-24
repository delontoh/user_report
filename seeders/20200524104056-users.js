'use strict';
const constants = require('../config/constants');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
            userId: '1',
            userType: constants.USER_TYPE.USER,
            userName: 'username1',
            password: '@password1',
            createdAt: new Date(),
            updatedAt: new Date()
            },
            {
                userId: '2',
                userType: constants.USER_TYPE.USER,
                userName: 'username2',
                password: '@password2',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
