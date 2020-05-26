'use strict';
const constants = require('../config/constants');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('reports', [
            {
                reportId: 'Dummy report 1',
                userId: '1',
                content: 'Geralt: this is my first report',
                reportDate: new Date(),
                status: constants.REPORT_STATUS.PENDING,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                reportId: 'Dummy report 2',
                userId: '1',
                content: 'Geralt: this is my second report',
                reportDate: new Date(),
                status: constants.REPORT_STATUS.APPROVED,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                reportId: 'Dummy report 3',
                userId: '1',
                content: 'Geralt: this is my third report',
                reportDate: new Date(),
                status: constants.REPORT_STATUS.DELETED,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                reportId: 'Dummy report 4',
                userId: '2',
                content: 'Jon Snow: this is my first report',
                reportDate: new Date(),
                status: constants.REPORT_STATUS.PENDING,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                reportId: 'Dummy report 5',
                userId: '2',
                content: 'Jon Snow: this is my second report',
                reportDate: new Date(),
                status: constants.REPORT_STATUS.APPROVED,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                reportId: 'Dummy report 6',
                userId: '2',
                content: 'Jon Snow: this is my third report',
                reportDate: new Date(),
                status: constants.REPORT_STATUS.DELETED,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('reports', null, {});
    }
};
