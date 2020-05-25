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
        return res.send('Node API');
    });


    /**
     * /api/user/login
     * shows form and current user
     */
    router.get('/login', (req, res, next) => {

    })

    /**
     * @api {get} /api/user/get-user
     * @apiName UserGetUser
     * @apiVersion 1.0.0
     * @apiGroup Api
     * @apiDescription Get user information by userName
     * @apiParam {String} userName user's userName
     */
    router.get('/user/get-user', async(req, res, next) => {
        try {
            let userName = req.query.userName || ''
            // Check for missing request params
            if(helpers.general.isEmpty(userName)) throw new Error('Missing request param: userName');
            // Retrieve user info
            let user = await UsersController.getUserInfoByUsername(userName);
            return helpers.api.createApiRes(req, res, 200, 'User info retrieved successfully', {user: user});
        } catch (err) {
            return helpers.api.createApiRes(req, res, 500, err.message);
        }
    })

    /**
     * @api {post} /api/user/register
     * @apiName UserRegister
     * @apiVersion 1.0.0
     * @apiGroup Api
     * @apiDescription Register new user
     * @apiParam {String} userName user's userName
     * @apiParam {String} password user's password
     */
    router.post('/user/register', async(req, res, next) => {
        try {
            let data = {
                userName: req.body.userName || '',
                password: req.body.password || ''
            };
            if(helpers.general.isEmpty(data.userName)) throw new Error('Missing request param: userName');
            if(helpers.general.isEmpty(data.password)) throw new Error('Missing request param: password');
            // Check if username already exist
            let checkUsername = await UsersController.getUserInfoByUsername(data.userName);
            if(helpers.general.isEmpty(checkUsername)) {
                let newUser = await UsersController.registerNewUser(data);
                return helpers.api.createApiRes(req, res, 200, 'Successfully registered new user', {user: newUser});
            } else {
                return helpers.api.createApiRes(req, res, 200, 'Username already exist', {});
            }
        } catch (err) {
            return helpers.api.createApiRes(req, res, 500, err.message);
        }
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
                reportDate: req.body.reportDate || '',
                userId: req.body.userId || '',
                content: req.body.content || ''
            };
            // Check for missing request params
            if(helpers.general.isEmpty(data.reportDate)) throw new Error('Missing request param: reportDate');
            if(helpers.general.isEmpty(data.userId)) throw new Error('Missing request param: userId');
            if(helpers.general.isEmpty(data.content)) throw new Error('Missing request param: content');
            // JSON parse content info
            if(!helpers.general.isEmpty(data.content)) {
                data.content = JSON.parse(data.content);
            }
            // Create new user report
            let report = await ReportController.addReportByUserId(data);
            return helpers.api.createApiRes(req, res, 200, 'Report submitted successfully', {report: report});
        } catch (err) {
            return helpers.api.createApiRes(req, res, 500, err.message);
        }
    })

    /**
     * @api {get} /api/user/all-reports
     * @apiName UserAllReports
     * @apiVersion 1.0.0
     * @apiGroup Api
     * @apiDescription Get all non pending user reports by userId
     * @apiParam {String} userId user id
     */
    router.get('/user/all-reports', async (req, res, next) => {
        try {
            let data = {
                userId: req.query.userId || ''
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
     * @api {post} /api/admin/update-report-status
     * @apiName AdminUpdateReportStatus
     * @apiVersion 1.0.0
     * @apiGroup Api
     * @apiDescription Update report status by reportId
     * @apiParam {String} reportId report id
     */
    router.post('/admin/update-report-status', async (req, res, next) => {
        try {
            let data = {
                reportId: req.body.reportId || '',
                status: req.body.status || ''
            };
            // Check for missing request params
            if(helpers.general.isEmpty(data.reportId)) throw new Error('Missing request param: reportId');
            if(helpers.general.isEmpty(data.status)) throw new Error('Missing request param: status');
            // Update report status
            await ReportController.updateReportStatusByReportId(data);
            return helpers.api.createApiRes(req, res, 200, 'User report status updated sucessfully', {status: true});
        } catch (err) {
            return helpers.api.createApiRes(req, res, 500, err.message, {status: false});
        }
    })

    /**
     * @api {post} /api/admin/update-report
     * @apiName AdminUpdateReportInfo
     * @apiVersion 1.0.0
     * @apiGroup Api
     * @apiDescription Update report information by reportId
     * @apiParam {String} reportId report id
     */
    router.post('/admin/update-report-info', async (req, res, next) => {
        try {
            let data = {
                reportId: req.body.reportId || '',
                reportDate: req.body.reportDate || '',
                content: req.body.content || ''
            };
            // Check for missing request params
            if(helpers.general.isEmpty(data.reportId)) throw new Error('Missing request param: reportId');
            if(helpers.general.isEmpty(data.reportDate)) throw new Error('Missing request param: reportDate');
            if(helpers.general.isEmpty(data.content)) throw new Error('Missing request param: content');
            // JSON parse content info
            if(!helpers.general.isEmpty(data.content)) {
                data.content = JSON.parse(data.content);
            }
            // Update report information
            await ReportController.updateReportInfoByReportId(data);
            return helpers.api.createApiRes(req, res, 200, 'User report information updated sucessfully', {status: true});
        } catch (err) {
            return helpers.api.createApiRes(req, res, 500, err.message, {status: false});
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
            let userId = req.query.userId;
            if(helpers.general.isEmpty(userId)) throw new Error('Missing request param: userId');
            // Check if id provided is admin
            let isAdmin = await UsersController.getAdminUserById(userId);
            isAdmin = helpers.general.isEmpty(isAdmin) ? false : true;
            // Retrieve all users and reports
            if(isAdmin) {
                let users = await ReportController.allUsersAndReports();
                return helpers.api.createApiRes(req, res, 200, 'Users and reports retrieved successfully', {users: users});
            } else {
                throw new Error('User is not an admin');
            }
        } catch (err) {
            return helpers.api.createApiRes(req, res, 500, err.message);
        }
    })
    return router;
}
