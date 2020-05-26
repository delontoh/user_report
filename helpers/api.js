const ApiHelper = module.exports;
const { v4: uuidv4 } = require('uuid');
const passwordHash = require('password-hash');

/**
 * Generic function to generate API response
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {Number} httpCode
 * @param {String} message
 * @param {Object} [resData={}]
 */
ApiHelper.createApiRes = (req, res, httpCode, message, resData) => {
    resData = resData || {};
    return res.status(httpCode).json({message, ...resData});
};

/**
 * Generate UUID
 * @returns {*}
 */
ApiHelper.generateId = () => {
    let id = uuidv4();
    return id;
}

/**
 * Generate hash password
 * @param {string} password
 * @returns {*|void}
 */
ApiHelper.hashPassword = (password) => {
    let hash = passwordHash.generate(password);
    return hash;
}

/**
 * Verify user password
 * @param {string} plainTextPassword
 * @param hashedPassword
 * @returns {boolean|*}
 */
ApiHelper.verifyPassword = (plainTextPassword, hashedPassword) => {
    return passwordHash.verify(plainTextPassword, hashedPassword);
}