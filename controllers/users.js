const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const constants = require('../config/constants');

module.exports = (db) => {
    const { UsersModel } = require('../models')(db);

    let UsersController = {};

    /**
     * Get user by username
     * @param {Array<String>} username
     * @returns {Promise<any>}
     */
    UsersController.getUserByUsername = async (username) => {
        const user = await UsersModel.findOne({ where: { userName: username } });
        return user;
    };

    /**
     * Get user by id
     * @param {Array<String>} id
     * @returns {Promise<any>}
     */
    UsersController.getUserById = async (id) => {
        const user = await UsersModel.findOne({ where: { userId: id } });
        return user;
    };

    /**
     * Get admin user by id
     * @param {Array<String>} id
     * @returns {Promise<any>}
     */
    UsersController.getAdminUserById = async (id) => {
        const user = await UsersModel.findOne({
            where: {
                [Op.and]: [
                    { userId: id },
                    { userType: constants.USER_TYPE.ADMIN}
                ]
            }});
        return user.dataValues;
    };


    return UsersController;
}