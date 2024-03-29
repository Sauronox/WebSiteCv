var LocalStrategy = require('passport-local').Strategy;
var User       	  = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (email, password, done) {
        console.log("Enter in function passport local-login");
            User.findOne({email: email}, function (err, user) {
                if (err) {
                    return done(err, false, req.flash('loginMessage','errror in DB'));
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