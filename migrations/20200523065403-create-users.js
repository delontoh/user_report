'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            user_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultType: Sequelize.UUID4
            },
            user_type: {
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
            report: {
                allowNull: true,
                type: Sequelize.TEXT
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