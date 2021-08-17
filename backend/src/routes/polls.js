/*eslint strict: ["error", "global"]*/

'use strict';

var express = require('express');
const db = require('../services/firebaseconnector');
const { formatedDate, sendResponse } = require('../services/helper');
var router = express.Router();

router.post('/', function (req, res, next) {
  //  return sendResponse( res,req.body,200);
  let { category, question, company, id,option1,option2,option3,option4 } = req.body;
    if (!category || !company || !question || !id  || !option1 || !option2)
      sendResponse(
        res,
        { error: 'Id, Category, Question, 2 options and company are required' },
        400
    );

    if(!option3){
      option3="";
    }
    if(!option4){
      option4="";
    }
    db.collection('polls')
      .doc(id)
      .set({
        category: category,
        company: company,
        created_at: formatedDate(new Date(), 'DD/MM/YYYY'),
        question: question,
        id,
        option1: {
        count: 0,
        option: option1,
        },
        option2: {
          count: 0,
          option: option2,
        },
        option3: {
          count: 0,
          option: option3,
        },
        option4: {
          count: 0,
          option: option4,
        },
      })
      .then((docRef) => {
        return res.status(200).json({ message: 'Add Poll success' });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: 'Add Poll error', error: error });
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
  let date=db.collection("polls").doc(id).created_at;
  db.collection("polls").doc(id).set({
      category: category,
      company: company,
      created_at: formatedDate(date!=null?new Date(date):new Date(),"DD/MM/YYYY"),
      updated_at: formatedDate(new Date(),"DD/MM/YYYY"),
      question:question,
      option1,
      option2,
      option3,
      option4
  })
  .then((docRef) => {
  //console.log("Document written with ID: ", docRef.id);
      return res.status(200).json({ message: 'Update Poll success ' });
  })
  .catch((error) => {
      //console.error("Error adding document: ", error);
      return res.status(500).json({ message: 'Update Poll error',error:JSON.stringify(error) });
  });

});

module.exports = router;
