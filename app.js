const express = require('express');
const morgan = require('morgan');
// const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const courseRouter = require('./routes/courseRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const resourceRouter = require('./routes/resourceRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const recordRouter = require('./routes/recordRoutes');

const app = express();

// 1) MIDDLEWARE
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan.apply('dev'));
}
app.use(morgan('dev'));
app.use(express.json());
// app.use(compression());

app.use((req, res, next) => {
  console.log('中间件一号');
  next();
});

// 3) ROUTES
app.use('/api/mobile/v1/courses', courseRouter);
app.use('/api/mobile/v1/users', userRouter);
app.use('/api/mobile/v1/orders', orderRouter);
app.use('/api/mobile/v1/resources', resourceRouter);
app.use('/api/mobile/v1/reviews', reviewRouter);
app.use('/api/mobile/v1/records', recordRouter);

module.exports = app;
