const express = require('express');
const orderController = require('../controller/orderController');
const authController = require('../controller/authController');
const router = express.Router();
router.route('/').get(authController.protect, orderController.getAllOrders);
// .post(authController.protect, orderController.createOrder);
router
  .route('/:id')
  .get(orderController.getOrder)
  .post(authController.protect, orderController.createOrder);
//   .patch(orderController.updateOrder)
//   .delete(orderController.deleteOrder);

module.exports = router;
