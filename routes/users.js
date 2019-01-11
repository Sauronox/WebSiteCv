var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User     = require('../models/user');
var passport = require('passport');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/users/login');
}

/* GET users listing. */
router.get('/', isAuthenticated,function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/dashboard', isAuthenticated,function(req, res, next) {
    res.render('dashboard', { title: 'Express'  });
});

// ========================================================
/**
 * LOGIN LOCAL
 */
router.get('/login', function(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect('/users/');
    }
    res.render('login', { message: req.flash('error') });
    console.log(req.user);
    console.log(req);
    console.log("Error Message : ",req.flash('error'))
});
router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/users/',
        failureRedirect: '/users/login',
        failureFlash: true
    }));

router.get('/account', function (req, res) {
    var newUser            = new User();

    newUser.email    = "alan.drieux@outlook.fr";
    newUser.password = newUser.generateHash("UduBhpbcvg8ripXCrf");

    newUser.save(function(err) {
        if (err)
            return res.json(err)

        return res.json(newUser);
    });
})



// ========================================================


module.exports = router;
