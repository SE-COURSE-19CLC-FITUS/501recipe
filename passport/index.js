var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const userService = require('../components/auth/userService')

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, done) {
        const user = await userService.findByEmail(email);
        if (!user) {
            return done(null, false, {
                message: 'Incorrect username.'
            });
        }
        const isValid = await userService.validPassword(password, user);
        if (!isValid) {
            return done(null, false, {
                message: 'Incorrect password.'
            });
        }

        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async function (user, done) {
    done(null, user);
});

module.exports = passport;