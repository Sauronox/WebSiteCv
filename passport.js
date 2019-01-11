var LocalStrategy = require('passport-local').Strategy;
var User       	  = require('./models/user');

module.exports = function(passport) {
    console.log("Enter in function passport CONF");
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
        function (req, email, password, done) {
            if (email)
                email = email.toLowerCase();
        process.nextTick(function () {
            User.findOne({email: email}, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, {message : 'Pas d\'utiliseteur trouver.'});
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {message : 'Mauvais mot de passe.'});
                }
                else  return done(null, user);
            });
        })
        }
    ));
}