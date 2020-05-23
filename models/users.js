const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const constant = require('../config/constant.json');

module.exports = (db) => {

    class Users extends Model {}
    Users.init({
        user_id: { type: Sequelize.UUID4, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
        user_type: { type: Sequelize.STRING, allowNull: false },
        userName: {type: Sequelize.STRING, allowNull: false},
        password: {type: Sequelize.STRING, allowNull: true},
        report: {type: Sequelize.TEXT, allowNull: true},
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {
        sequelize: db,
        freezeTableName: true,
        modelName: 'Users',
        tableName: 'users'
    });

    return {
        db,
        UsersModel: Users,
    }
}
