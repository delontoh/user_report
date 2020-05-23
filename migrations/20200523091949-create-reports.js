'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reports', {
      reportId: {
        allowNull: false,
        primaryKey: true,
          type: Sequelize.UUID,
          defaultType: Sequelize.UUID4
      },
      content: {
          allowNull: false,
          type: Sequelize.TEXT
      },
      reportDate: {
          allowNull: false,
          type: Sequelize.DATE
      },
      userId: {
          type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'userId' }
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