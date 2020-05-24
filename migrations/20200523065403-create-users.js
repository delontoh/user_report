'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultType: Sequelize.STRING
            },
            userType: {
                allowNull: false,
                type: Sequelize.STRING
            },
            userName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: true,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};