/*eslint strict: ["error", "global"]*/

'use strict';

var logger = require('morgan');
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var questionRouter = require('./routes/questions');
var pollRouter = require('./routes/polls');


var app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api/v1', indexRouter);
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/polls', pollRouter);



module.exports = app;
