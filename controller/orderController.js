const Order = require('../models/orderModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllOrders = catchAsync(async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
});

exports.createOrder = catchAsync(async (req, res) => {
  try {
    console.log(req.body);
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      status: 'scccess',
      data: newOrder,
    });
  } catch (err) {
    console.log(er);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
});

exports.getOrder = catchAsync(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    // .populate('chapters.lessons.resources')
    console.log(order);

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
});
