var express = require('express');
var router = express.Router();
var passport = require('passport');
require('./config/passport')(passport);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'Express' });
});

// ========================================================
/**
 * LOGIN LOCAL
 */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});
router.post('/login', function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
});
// ========================================================


module.exports = router;
