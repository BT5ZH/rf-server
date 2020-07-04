const express = require('express');
const courseController = require('../controller/courseController');
const authController = require('../controller/authController');
const reviewRouter = require('../routes/reviewRoutes');
const userRouter = require('../routes/userRoutes');
// const reviewController = require('../controller/reviewController');
const router = express.Router(); //{ mergeParams: true }

router.use('/:courseId/reviews', reviewRouter);
router.use('/:courseId/users', userRouter);

router
  .route('/')
  .get(authController.protect, courseController.getAllCourses)
  .post(authController.protect, courseController.createCourse);

router
  .route('/:id')
  .get(authController.protect, courseController.getCourse)
  .patch(authController.protect, courseController.updateCourse)
  .delete(authController.protect, courseController.deleteCourse);

// post /course/dddd/reviews
// get /course/dddd/reviews
// get /course/dddd/reviews/90jifjdio98

module.exports = router;

// app.use('/api/mobile/v1/courses', courseRouter);
