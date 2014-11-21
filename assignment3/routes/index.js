var express = require('express');
var router = express.Router();
var gv = require('../globalvoices.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('base.html'); //, { title: 'GV - node version' });
});

module.exports = router;
