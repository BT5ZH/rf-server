const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  products: [
    {
      quantity: Number,

      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: [true, 'A order must belong to a Course'],
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A order must belong to a User'],
  },
  amount: {
    type: Number,
    required: [true, 'A order must have an amount-price'],
  },
  createAt: {
    type: Date,
    default: Date.now(),
    // required: [true, 'A course must have a timeStamp'],
  },
  paid: {
    type: Boolean,
    default: true,
  },
  // products: {
  // type: Schema.Types.Mixed,
  // required: [true, 'A course must contain at least one product'],
  // products: {},
  // },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'email' }).populate({
    path: 'products.product',
    select: 'title price',
  });
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
