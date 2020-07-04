const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'a review must have a comment'],
  },
  rating: {
    type: Number,
    required: [true, 'a review must have a rating'],
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: [true, 'a review must belong to a course'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'a review must belong to a user'],
  },
});

reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'course',
  //     select: 'title',
  //   }).populate({ path: 'user', select: 'title' });
  this.populate({ path: 'user', select: 'email' });

  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
