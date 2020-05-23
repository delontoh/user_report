const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const constant = require('../config/constant.json');

module.exports = (db) => {

    class Users extends Model {}
    Users.init({
        userId: { type: Sequelize.UUID4, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
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
        reportId: { type: Sequelize.UUID4, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
        content: { type: Sequelize.TEXT, allowNull: false },
        reportDate: {type: Sequelize.DATE, allowNull: false},
        userId: {type: Sequelize.UUIDV4, allowNull: false, references: { model: Users, key: 'userId' } },
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
        ReportssModel: Reports
    }
}
