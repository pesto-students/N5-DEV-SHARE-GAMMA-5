const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const indexRouter = require('./routes/index');
const questionRouter = require('./routes/questions');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(xss());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1', indexRouter);
app.use('/api/v1/questions', questionRouter);

module.exports = app;
