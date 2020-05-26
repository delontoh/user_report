'use strict';
const constants = require('../config/constants');
const helpers = require('../helpers');

let userPassword1 = 'yennifer';
let userPassword2 = 'kingofthenorth'
const hashPassword1 = helpers.api.hashPassword(userPassword1);
const hashPassword2 = helpers.api.hashPassword(userPassword2);

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
            userId: '1',
            userType: constants.USER_TYPE.USER,
            userName: 'geralt_of_rivia',
            password: hashPassword1,
            createdAt: new Date(),
            updatedAt: new Date()
            },
            {
                userId: '2',
                userType: constants.USER_TYPE.USER,
                userName: 'jon_snow',
                password: hashPassword2,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
