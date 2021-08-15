/*eslint strict: ["error", "global"]*/

'use strict';

var express = require('express');
const db = require('../services/firebaseconnector');
const { formatedDate, sendResponse } = require('../services/helper');
var router = express.Router();
router.post('/', function (req, res, next) {
    let { category, question, company, id } = req.body;
    if (!category || !company || !question || !id)
      sendResponse(
        res,
        { error: 'Id,Category,question and company are required' },
        400
      );
    db.collection('questions')
      .doc(id)
      .set({
        category: category,
        company: company,
        created_at: formatedDate(new Date(), 'DD/MM/YYYY'),
        question: question,
        id,
      })
      .then((docRef) => {
        return res.status(200).json({ message: 'Add Question success' });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: 'Add Question error', error: error });
      });
});


router.put('/:id', function(req, res, next) {
  let id=req.params.id;

  let {category,question,company}=req.body;

  if(!id)
        sendResponse(res,"Id is required",400);
  else if(!category || !company || !question)
        sendResponse(res,{error:"Category,question and company are required"},400);
  // sendResponse(res,req.body,200);
  let date=db.collection("questions").doc(id).created_at;
  db.collection("questions").doc(id).set({
      category: category,
      company: company,
      created_at: formatedDate(date!=null?new Date(date):new Date(),"DD/MM/yyyy"),

      updated_at: formatedDate(new Date(),"DD/MM/yyyy"),
      question:question
  })
  .then((docRef) => {
  //console.log("Document written with ID: ", docRef.id);
      return res.status(200).json({ message: 'Update Question success ' });
  })
  .catch((error) => {
      //console.error("Error adding document: ", error);
      return res.status(500).json({ message: 'Update Question error',error:JSON.stringify(error) });
  });
  
});

module.exports = router;
