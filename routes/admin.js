var express = require('express');
var router = express.Router();
var admin = require('../controllers/AdminController');

/* GET users listing. */
router.get('/', function (req, res, next) {
  admin.index(req, res);
});

router.get('/add-role', function (req, res, next) {
  admin.add_roles(req, res);
});

router.post('/add-user', function (req, res, next) {
  admin.add_user(req, res);
});

router.post('/list-user', function (req, res, next) {
  admin.list_user(req, res);
});

router.get('/login', function (req, res, next) {
  admin.login(req, res);
});

router.post('/login', function (req, res, next) {
  admin.login(req, res);
});

router.get('/logout', function (req, res, next) {
  admin.logout(req, res);
});

router.get('/dashboard', function (req, res, next) {
  admin.dashboard(req, res);
});

module.exports = router;
