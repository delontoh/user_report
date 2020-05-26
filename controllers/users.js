const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const helpers = require('../helpers')
const constants = require('../config/constants');

module.exports = (db) => {
    const { UsersModel } = require('../models')(db);
    let UsersController = {};

    /**
     * Get user information by userName
     * @param {String} userName
     * @returns {Promise<any>}
     */
    UsersController.getUserInfoByUsername = async(userName) => {
        const user = await UsersModel.findOne({ where: { userName: userName } });
        return user;
    }

    /**
     * Get user by id
     * @param {String} id
     * @returns {Promise<any>}
     */
    UsersController.getUserById = async(id) => {
        const user = await UsersModel.findOne({ where: { userId: id } });
        return user;
    };

    /**
     * Get admin user by id
     * @param {String} id
     * @returns {Promise<any>}
     */
    UsersController.getAdminUserById = async(id) => {
        const user = await UsersModel.findOne({
            where: {
                [Op.and]: [
                    { userId: id },
                    { userType: constants.USER_TYPE.ADMIN}
                ]
            }});
        return user ? user.dataValues : null;
    };

    /**
     * Register new user
     * @param {Object<String>} data
     * @returns {Promise<any>}
     */
    UsersController.registerNewUser = async(data) => {
        let { userName, password } = data;
        let userId = helpers.api.generateId();
        const hashedPassword = helpers.api.hashPassword(password);
        const newUser = await UsersModel.create({
            userId: userId,
            userType: constants.USER_TYPE.USER,
            userName: userName,
            password: hashedPassword
        });
        return newUser.dataValues;
    }

    return UsersController;
}