/*eslint strict: ["error", "global"]*/

'use strict';

var express = require('express');
const db = require('../services/firebaseconnector');
const { formatedDate, sendResponse } = require('../services/helper');
var router = express.Router();
var sendEmail=require('../services/mailservice');

router.post('/', function(req, res, next) {
  if(!req.body.category || !req.body.company || !req.body.question)
        sendResponse(res,"Category,question and company are required",400);
 // sendResponse(res,req.body,200);
  db.collection("questions").add({
      id:"dd",
      category: req.body.category,
      company: req.body.company,
      created_at: formatedDate(new Date(),"dd/mm/yyyy"),
      question:req.body.question
  })
  .then((docRef) => {
      //console.log("Document written with ID: ", docRef.id);
      return res.status(200).json({ message: 'Add Question success' });
  })
  .catch((error) => {
      //console.error("Error adding document: ", error);
      return res.status(500).json({ message: 'Add Question erro',error:error });
  });
  
});


module.exports = router;
