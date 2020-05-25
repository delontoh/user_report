const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt-nodejs');

function initialize(passport, db) {
    const UsersController = require('../controllers/users')(db);

    const authenticateUser = async (username, password, done) => {
        const user = await UsersController.getUserByUsername(username);
        if (user == null) {
            return done(null, false, { message: 'Username does not exist' })
        }

        // try {
        //     if (await bcrypt.compare(password, user.password)) {
        //         return done(null, user)
        //     } else {
        //         return done(null, false, { message: 'Password incorrect' })
        //     }
        // } catch (e) {
        //     return done(e)
        // }
    };

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.userId));
    passport.deserializeUser(async (id, done) => {
        let getUserById = await UsersController.getUserById(id);
        if(getUserById) {
            return done(null, true)
        }
    });
}

module.exports = initialize


