'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reports', {
      reportId: {
        allowNull: false,
        primaryKey: true,
          type: Sequelize.STRING,
          defaultType: Sequelize.STRING
      },
      userId: {
          type: Sequelize.STRING, allowNull: false
      },
      content: {
          allowNull: false,
          type: Sequelize.TEXT
      },
      reportDate: {
          allowNull: false,
          type: Sequelize.DATE
      },
      status: {
          type: Sequelize.STRING,
          allowNull: false
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
    return queryInterface.dropTable('reports');
  }
};