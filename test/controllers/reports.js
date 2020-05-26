const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const dbConfig = require('../../config/config');
const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize(dbConfig.test);
const { db, ReportsModel, UsersModel } = require('../../models')(sequelize);
const helpers = require('../../helpers');
const constants = require('../../config/constants');
const ReportsController= require('../../controllers/reports')(sequelize);

const ReportsTest = [];
const UsersTest = [];
const testPassword = helpers.api.hashPassword('123');
const date = new Date().toISOString();

describe('*** Users Controller ***', () => {
    before(async () => {
        await db.sync();
        // User 1 reports
        ReportsTest.push(await ReportsModel.create({ reportId: '1', reportDate: date, userId: '1', content: 'contentstring', status: constants.REPORT_STATUS.APPROVED}));
        ReportsTest.push(await ReportsModel.create({ reportId: '2', reportDate: date, userId: '1', content: 'contentstring', status: constants.REPORT_STATUS.PENDING}));
        ReportsTest.push(await ReportsModel.create({ reportId: '3', reportDate: date, userId: '1', content: 'contentstring', status: constants.REPORT_STATUS.DELETED}));
        // User 2 reports
        ReportsTest.push(await ReportsModel.create({ reportId: '4', reportDate: date, userId: '2', content: 'contentstring', status: constants.REPORT_STATUS.APPROVED}));
        ReportsTest.push(await ReportsModel.create({ reportId: '5', reportDate: date, userId: '2', content: 'contentstring', status: constants.REPORT_STATUS.PENDING}));
        ReportsTest.push(await ReportsModel.create({ reportId: '6', reportDate: date, userId: '2', content: 'contentstring', status: constants.REPORT_STATUS.DELETED}));
        // Users
        UsersTest.push(await UsersModel.create({ userId: '1', userName: 'testUser1', userType: constants.USER_TYPE.USER, password: testPassword}));
        UsersTest.push(await UsersModel.create({ userId: '2', userName: 'testUser2', userType: constants.USER_TYPE.USER, password: testPassword}));
    })

    describe('Test >>> ReportsController.getReportsByUserId', async() => {
        it('Should return empty array if user id is empty', async () => {
            const reports = await ReportsController.getReportsByUserId({userId: ''});
            assert.isEmpty(reports);
        });
        it('Should return empty array if user id does not exist', async () => {
            const reports = await ReportsController.getReportsByUserId({userId: '10'});
            assert.isEmpty(reports);
        });
        it('Should return only active and deleted reports given user id', async () => {
            let userId = UsersTest[0].userId;
            const reports = await ReportsController.getReportsByUserId({userId: userId});
            assert.isNotNull(reports);
            assert.typeOf(reports, 'array');
            expect(reports).to.have.length(2);
        });
    })

    describe('Test >>> ReportsController.getReportByReportId', async() => {
        it('Should return null if report id is empty', async () => {
            const reports = await ReportsController.getReportByReportId({reportId: ''});
            assert.isNull(reports);
        });
        it('Should return null if report id does not exist', async () => {
            const reports = await ReportsController.getReportByReportId({reportId: '10'});
            assert.isNull(reports);
        });
        it('Should return single report given report id', async () => {
            let reportId = ReportsTest[0].reportId;
            const report= await ReportsController.getReportByReportId({reportId: reportId});
            assert.isNotNull(report);
            assert.typeOf(report, 'object')
        });
    })

    after(async () => {
        await db.drop();
        await db.close();
    })
})
