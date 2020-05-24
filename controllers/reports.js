const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const helpers = require('../helpers')
const constants = require('../config/constants');

module.exports = (db) => {
    const { ReportsModel } = require('../models')(db);
    let ReportsController = {};

    /**
     * Create new report by userId
     * @param {Object} data
     * @returns {Promise<*>}
     */
    ReportsController.addReportByUserId = async(data) => {
        let { date, content, userId } = data;
        let reportId = helpers.api.generateId();
        let status = constants.REPORT_STATUS.APPROVED;
        const newReport = await ReportsModel.create({
            reportId: reportId,
            userId: userId,
            reportDate: date,
            content: content,
            status: status
        });
        return newReport.dataValues;
    };

    /**
     * Get user reports by userId where status is 'APPROVED' or 'PENDING'
     * @param {Object} data
     * @returns {Promise<*>}
     */
    ReportsController.getReportsByUserId = async(data) => {
        let { userId } = data;
        let getUserReports = await ReportsModel.findAll(
            { where:
                { userId: userId,
                    status: {
                        [Op.or] : [constants.REPORT_STATUS.PENDING, constants.REPORT_STATUS.APPROVED]
                    }
                }
            }
        );
        getUserReports = getUserReports.length > 0 ? getUserReports : [];
        return getUserReports;
    }

    /**
     * Get single user report by reportId
     * @param {Object} data
     * @returns {Promise<*>}
     */
    ReportsController.getReportByReportId = async(data) => {
        let { reportId } = data;
        let report = await ReportsModel.findOne(
            { where: { reportId: reportId }}
        );
        return report.dataValues;
    }

    /**
     * Get all normal users and reports
     * @returns {Promise<*>}
     */
    ReportsController.allUsersAndReports = async() => {
        let userType = constants.USER_TYPE.ADMIN;
        let results = await db.query(
            `SELECT u.userId, u.userName, u.userType, r.reportId, r.reportDate, r.content, r.status, r.createdAt, r.updatedAt
             FROM users u 
             LEFT JOIN reports r ON u.userId = r.userId
             WHERE u.userType != ?`, {replacements: [userType], type: Sequelize.QueryTypes.SELECT});
        return results;
    }

    /**
     * Update report status by reportId
     * @returns {Promise<*>}
     */
    ReportsController.updateReportByReportId = async(data) => {
        let { reportId, status } = data;
        return await ReportsModel.update({status: status}, {where: {reportId: reportId}});
    }

    return ReportsController;
}