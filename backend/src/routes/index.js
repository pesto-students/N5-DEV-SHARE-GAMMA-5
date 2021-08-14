/*eslint strict: ["error", "global"]*/

'use strict';

var express = require('express');
const db = require('../services/firebaseconnector');
var router = express.Router();
var mailservice=require('../services/mailservice');
router.get('/', function(req, res, next) {
  return res.status(200).json({ message: 'home page' });
});

router.get('/verifymail/:email', function(req, res, next) {
    var token = Math.random().toString(36).substr(2, 5);
    var text='Hello '+ req.params.email +',\n\n' + 
              'Please verify your account by clicking the link: \nhttp:\/\/' +
               req.headers.host + '\/v1\/confirmation\/' + req.params.email + '\/' +
                token + '\n\nThank You!\n' ;

    mailservice.sendEmail('no-reply@example.com', req.params.email , 'Account Verification Link',  text);
    return res.status(200).send('A verification email has been sent to ' + req.params.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
});

router.get('/confirmation/:email/:token', function(req, res, next) {
  return res.status(200).send('A verification of your email ' + req.params.email + ' is successful');
});

router.get('/company/search/:id', function(req, res, next) {
  let search_text=req.params.id;

  if(!search_text )
        sendResponse(res,{error:"search text is required"},400);
 
  db.collection("companies").get()
  .then((querySnapshot) => {
      //console.log("Document written with ID: ", docRef.id);
      let array=[];
      querySnapshot.forEach((doc) => {
        array.push({"name":doc.id});
      });

      return res.status(200).json(array.filter((c)=> {return c.name.includes(search_text) }));
  })
  .catch((error) => {
      //console.error("Error adding document: ", error);
      return res.status(500).json({ message: 'Error',error:error });
  });
  
});


module.exports = router;
