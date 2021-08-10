/*eslint strict: ["error", "global"]*/

'use strict';

var express = require('express');
var router = express.Router();
var sendEmail=require('../services/mailservice');

router.post('/add', function(req, res, next) {
  return res.status(200).json({ message: 'Add Question success' });
});


module.exports = router;
