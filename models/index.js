const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const constant = require('../config/constants');

module.exports = (db) => {

    class Users extends Model {}
    Users.init({
        userId: { type: Sequelize.STRING, primaryKey: true, defaultValue: Sequelize.STRING },
        userType: { type: Sequelize.STRING, allowNull: false },
        userName: {type: Sequelize.STRING, allowNull: false},
        password: {type: Sequelize.STRING, allowNull: true},
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {
        sequelize: db,
        freezeTableName: true,
        modelName: 'Users',
        tableName: 'users'
    });

    class Reports extends Model {}
    Reports.init({
        reportId: { type: Sequelize.STRING, primaryKey: true, defaultValue: Sequelize.STRING },
        userId: {type: Sequelize.STRING, allowNull: false},
        reportDate: {type: Sequelize.DATE, allowNull: false},
        content: { type: Sequelize.TEXT, allowNull: false },
        status: {type: Sequelize.STRING, allowNull: false},
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {
        sequelize: db,
        freezeTableName: true,
        modelName: 'Reports',
        tableName: 'Reports'
    });

    return {
        db,
        UsersModel: Users,
        ReportsModel: Reports
    }
}
