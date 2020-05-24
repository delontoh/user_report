const express = require('express')
const router = express.Router()
const helpers = require('../helpers')

module.exports = (db) => {
    const ReportController = require('../controllers/reports')(db);
    const UsersController = require('../controllers/users')(db);

    /**
     * Default router home page
     */
    router.get('/', (req, res, next) => {
        return res.redirect('/login');
    });


    /**
     * /api/user/login
     * shows form and current user
     */

    router.get('/login', (req, res, next) => {

    })


    /**
     * @api {post} /api/user/submit-report
     * @apiName UserSubmitUserReport
     * @apiVersion 1.0.0
     * @apiGroup Api
     * @apiDescription Submits a new user report
     * @apiParam {String} date report date
     * @apiParam {String} userId user id
     * @apiParam {String} report report content
     */
    router.post('/user/submit-report', async(req, res, next) => {
        try {
            let data = {
                date: req.body.date || '',
                userId: req.body.userId || '',
                // content: req.body.report ? JSON.parse(req.body.report) : ''
                content: req.body.report || ''
            };
            // Check for missing request params
            if(helpers.general.isEmpty(data.date)) throw new Error('Missing request param: date');
            if(helpers.general.isEmpty(data.userId)) throw new Error('Missing request param: userId');
            if(helpers.general.isEmpty(data.content)) throw new Error('Missing request param: content');
            // Create new user report
            let report = await ReportController.addReportByUserId(data);
            return helpers.api.createApiRes(req, res, 204, 'Report submitted successfully', {report: report});
        } catch (err) {
            return helpers.api.createApiRes(req, res, 500, err.message);
        }
    })

    /**
     * @api {get} /api/user/all-reports
     * @apiName UserAllReports
     * @apiVersion 1.0.0
     * @apiGroup Api
     * @apiDescription Get all user reports by userId
     * @apiParam {String} userId user id
     */
    router.get('/user/all-reports', async (req, res, next) => {
        try {
            let data = {
                userId: req.body.userId || ''
            };
            // Check for missing request params
            if(helpers.general.isEmpty(data.userId)) throw new Error('Missing request param: userId');
            // Fetch all reports belonging to user
            let userReports = await ReportController.getReportsByUserId(data);
            return helpers.api.createApiRes(req, res, 200, 'All reports retrieved sucessfully', {userReports: userReports});
        } catch (err) {
            return helpers.api.createApiRes(req, res, 500, err.message);
        }
    })

    /**
     * @api {get} /api/user/report
     * @apiName UserReport
     * @apiVersion 1.0.0
     * @apiGroup Api
     * @apiDescription Get single user report by reportId
     * @apiParam {String} reportId report id
     */
    router.get('/user/report', async (req, res, next) => {
        try {
            let data = {
                reportId: req.body.reportId || ''
            };
            // Check for missing request params
            if(helpers.general.isEmpty(data.reportId)) throw new Error('Missing request param: reportId');
            // Fetch all reports belonging to user
            let userReport = await ReportController.getReportByReportId(data);
            return helpers.api.createApiRes(req, res, 200, 'User report retrieved sucessfully', {userReport: userReport});
        } catch (err) {
            return helpers.api.createApiRes(req, res, 500, err.message);
        }
    })

    /**
     * @api {post} /api/user/update-report
     * @apiName UserUpdateReport
     * @apiVersion 1.0.0
     * @apiGroup Api
     * @apiDescription Update report status by reportId
     * @apiParam {String} reportId report id
     */
    router.post('/user/update-report', async (req, res, next) => {
        try {
            let data = {
                reportId: req.body.reportId || '',
                status: req.body.status || ''
            };
            // Check for missing request params
            if(helpers.general.isEmpty(data.reportId)) throw new Error('Missing request param: reportId');
            if(helpers.general.isEmpty(data.status)) throw new Error('Missing request param: status');
            // Update report status
            await ReportController.updateReportByReportId(data);
            return helpers.api.createApiRes(req, res, 204, 'User report updated sucessfully', {});
        } catch (err) {
            return helpers.api.createApiRes(req, res, 500, err.message);
        }
    })

    /**
     * @api {get} /api/admin/users-reports
     * @apiName AdminUsersReports
     * @apiVersion 1.0.0
     * @apiGroup Api
     * @apiDescription Get all users and reports by admin userId
     */
    router.get('/admin/users-reports', async (req, res, next) => {
        try {
            let userId = req.body.userId;
            if(helpers.general.isEmpty(userId)) throw new Error('Missing request param: userId');

            // Check if id provided is admin
            let adminExist = await UsersController.getAdminUserById(userId);
            adminExist = helpers.general.isEmpty(adminExist) ? false : true;
            // Retrieve all users and reports
            if(adminExist) {
                let data = await ReportController.allUsersAndReports();
                return helpers.api.createApiRes(req, res, 200, 'Users and reports retrieved successfully', {data: data});
            } else {
                throw new Error('User is not an admin');
            }
        } catch (err) {
            return helpers.api.createApiRes(req, res, 500, err.message);
        }
    })
    return router;
}
