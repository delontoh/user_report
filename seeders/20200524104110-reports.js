'use strict';
const constants = require('../config/constants');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('reports', [
            {
                reportId: '1',
                userId: '1',
                content: 'User 1: this is my first report',
                reportDate: new Date(),
                status: constants.REPORT_STATUS.PENDING,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                reportId: '2',
                userId: '1',
                content: 'User 1: this is my second report',
                reportDate: new Date(),
                status: constants.REPORT_STATUS.APPROVED,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                reportId: '3',
                userId: '2',
                content: 'User 2: this is my first report',
                reportDate: new Date(),
                status: constants.REPORT_STATUS.PENDING,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                reportId: '4',
                userId: '2',
                content: 'User 2: this is my second report',
                reportDate: new Date(),
                status: constants.REPORT_STATUS.DELETEDn,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('reports', null, {});
    }
};
