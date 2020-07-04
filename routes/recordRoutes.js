const express = require('express');
const recordController = require('../controller/recordController');
const authController = require('../controller/authController');
const router = express.Router();
router
  .route('/')
  .get(authController.protect, recordController.getAllRecords)
  .post(authController.protect, recordController.createRecord);
// .patch(authController.protect, recordController.addOrUpdateRecord);

router
  .route('/:userId')
  .patch(authController.protect, recordController.addOrUpdateRecord)
  .get(authController.protect, recordController.getRecord);

module.exports = router;
