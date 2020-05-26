const assert = require('chai').assert;
const dbConfig = require('../../config/config');
const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize(dbConfig.test);
const { db, UsersModel } = require('../../models')(sequelize);
const helpers = require('../../helpers');
const constants = require('../../config/constants');
const UsersController= require('../../controllers/users')(sequelize);

const UsersTest = [];
const testPassword = helpers.api.hashPassword('123');

describe('*** Users Controller ***', () => {
    before(async () => {
        await db.sync();
        UsersTest.push(await UsersModel.create({ userId: '1', userName: 'testUser1', userType: constants.USER_TYPE.USER, password: testPassword}));
        UsersTest.push(await UsersModel.create({ userId: '2', userName: 'testUser2', userType: constants.USER_TYPE.USER, password: testPassword}));
        UsersTest.push(await UsersModel.create({ userId: '3', userName: 'testUser3', userType: constants.USER_TYPE.USER, password: testPassword}));
        UsersTest.push(await UsersModel.create({ userId: '4', userName: 'adminUser', userType: constants.USER_TYPE.ADMIN, password: testPassword}));
    })

    describe('Test >>> UsersController.getUserInfoByUsername', async() => {
        it('Should return null if username is empty', async () => {
            const user = await UsersController.getUserInfoByUsername('');
            assert.isNull(user);
        });
        it('Should return null if username does not exist', async () => {
            const user = await UsersController.getUserInfoByUsername('notExistUser');
            assert.isNull(user);
        });
        it('Should return user info given username', async () => {
            const user = await UsersController.getUserInfoByUsername(UsersTest[0].userName);
            assert.isNotNull(user);
            assert.typeOf(user, 'object');
            assert.strictEqual(user.userId, UsersTest[0].userId);
            assert.strictEqual(user.userType, UsersTest[0].userType);
            assert.strictEqual(user.userName, UsersTest[0].userName);
            assert.strictEqual(user.password, UsersTest[0].password);
        });
    })

    describe('Test >>> UsersController.getUserById', async() => {
        it('Should return null if user id is empty', async () => {
            const user = await UsersController.getUserById('');
            assert.isNull(user);
        });
        it('Should return null if user id does not exist', async () => {
            const user = await UsersController.getUserById('8888');
            assert.isNull(user);
        });
        it('Should return user info given user id', async () => {
            const user = await UsersController.getUserById(UsersTest[1].userId);
            assert.isNotNull(user);
            assert.typeOf(user, 'object');
            assert.strictEqual(user.userId, UsersTest[1].userId);
            assert.strictEqual(user.userType, UsersTest[1].userType);
            assert.strictEqual(user.userName, UsersTest[1].userName);
            assert.strictEqual(user.password, UsersTest[1].password);
        })
    })

    describe('Test >>> UsersController.getAdminUserById', async() => {
        it('Should return null if admin user id is empty', async () => {
            const user = await UsersController.getAdminUserById('');
            assert.isNull(user);
        });
        it('Should return null if admin user id does not exist', async () => {
            const user = await UsersController.getAdminUserById('8888');
            assert.isNull(user);
        });
        it('Should return admin user info given admin user id', async () => {
            const user = await UsersController.getAdminUserById(UsersTest[3].userId);
            console.log(user)
            assert.isNotNull(user);
            assert.typeOf(user, 'object');
            assert.strictEqual(user.userId, UsersTest[3].userId);
            assert.strictEqual(user.userType, UsersTest[3].userType);
            assert.strictEqual(user.userName, UsersTest[3].userName);
            assert.strictEqual(user.password, UsersTest[3].password);
        })
    })

    after(async () => {
        await db.drop();
        await db.close();
    })
})