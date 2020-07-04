const mongoose = require('mongoose');
const recordSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A record must belong to a User'],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  products: [
    {
      _id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: [true, 'A record must belong to a Course'],
      },
      isFavorite: { type: Boolean, default: false },
    },
  ],
  isFavorite: Boolean,
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
