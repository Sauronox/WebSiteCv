var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
module.exports = function(passport) {

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (email, password, done) {
            User.findOne({email: email}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('loginMessage','Incorrect username.'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage','Incorrect password.'));
                }
                return done(null, user);
            });
        }
    ));
}