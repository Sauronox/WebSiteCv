var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User     = require('../models/user');
var passport = require('passport');
var path    = require("path");
var fs = require('fs');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/users/login');
}

/* GET users listing. */
router.get('/', isAuthenticated,function(req, res, next) {
    res.render('dashboard', { title: 'Express' , path: req.path, user: req.user});
});
router.get('/path/:page', function (req, res) {
    res.headersSent;
    console.log(req.app.get('views'));
    console.log("res.headersSent : ",res.headersSent);
    fs.readFile('./views/'+req.params.page+'.ejs', function (err, html) {
        if (err) {
            throw err;
        }
        let page = html.toString('utf8')
        console.log(Buffer.isBuffer(html));
        res.set('Content-Type', 'text/html');
        //res.send(page);
        res.status(200).send(page);
    });

    console.log("res.headersSent : ",res.headersSent);
})
router.get('/portfolios', isAuthenticated,function(req, res, next) {
    res.render('portfolios', { title: 'Express' , path: req.path, user: req.user });
});
router.get('/CvManager', isAuthenticated,function(req, res, next) {
    res.render('cv', { title: 'Express' , path: req.path, user: req.user });
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
    console.log("Error Message : ",req.flash('error'))
});
router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/users/',
        failureRedirect: '/users/login',
        failureFlash: true
    }));

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

/*router.get('/account', function (req, res) {
    var newUser            = new User();

    newUser.email    = "alan.drieux@outlook.fr";
    newUser.password = newUser.generateHash("UduBhpbcvg8ripXCrf");

    newUser.save(function(err) {
        if (err)
            return res.json(err)

        return res.json(newUser);
    });
})*/



// ========================================================


module.exports = router;
