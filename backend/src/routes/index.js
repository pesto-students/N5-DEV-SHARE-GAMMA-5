/*eslint strict: ["error", "global"]*/

'use strict';

var express = require('express');
var router = express.Router();
var sendEmail=require('../services/mailservice');
router.get('/', function(req, res, next) {
  return res.status(200).json({ message: 'Welcome to Express API template' });
});

router.get('/verifymail/:email', function(req, res, next) {
    var token = "lskmsfmskldmsldmskdlsd";
    var text='Hello '+ req.params.email +',\n\n' + 
              'Please verify your account by clicking the link: \nhttp:\/\/' +
               req.headers.host + '\/v1\/confirmation\/' + req.params.email + '\/' +
                token + '\n\nThank You!\n' ;

    sendEmail('no-reply@example.com', req.params.email , 'Account Verification Link',  text);
    return res.status(200).send('A verification email has been sent to ' + req.params.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
});

router.get('/confirmation/:email/:token', function(req, res, next) {
  return res.status(200).send('A verification of your email ' + req.params.email + ' is successful');
});


module.exports = router;
