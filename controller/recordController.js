const Record = require('../models/recordModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllRecords = catchAsync(async (req, res, next) => {
  try {
    const records = await Record.find();

    res.status(200).json({
      status: 'success',
      results: records.length,
      data: {
        records,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
});

exports.getRecord = catchAsync(async (req, res, next) => {
  try {
    // console.log(req.params.userId);
    const record = await Record.findById(req.params.userId);

    // console.log(record);

    res.status(200).json({
      status: 'success',
      data: {
        record,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
});

exports.createRecord = catchAsync(async (req, res) => {
  try {
    console.log(req.body);
    const newRecord = await Record.create(req.body);
    res.status(201).json({
      status: 'scccess',
      data: newRecord,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
});

exports.addOrUpdateRecord = catchAsync(async (req, res, next) => {
  console.log('updateRecord: 进来啦');
  //   console.log(req.body);
  //   "array1.$[elem1].array2.$[elem2].value1": "test changed",
  //       },
  let filter = {};
  if (req.params.userId) filter = { _id: req.params.userId };
  let record;
  let record2;
  //   let condition = req.body._id;
  try {
    record = await Record.findOne(filter);

    if (record) {
      console.log('user exist');
      const courseTemp = record.products.find(
        (product) => product._id == req.body.products[0]._id
      );
      //   console.log(courseTemp);
      // course exits
      if (courseTemp) {
        // update isFavorite
        console.log('有--------');

        record2 = await Record.findOneAndUpdate(
          {
            _id: req.params.userId,
            'products._id': req.body.products[0]._id,
          },
          {
            $set: { 'products.$.isFavorite': req.body.products[0].isFavorite },
          },
          {
            new: true,
            upsert: true,
          }
        );
      } else {
        console.log(req.body.products[0]._id);
        record2 = await Record.findOneAndUpdate(
          {
            _id: req.params.userId,
            'products._id': { $ne: req.body.products[0]._id },
          },
          {
            $addToSet: {
              products: { _id: req.body.products[0]._id, isFavorite: false },
            },
          },
          {
            new: true,
            upsert: true,
          }
        );
      }
      // course not exist
    } else {
      // save userRecord directly
      record2 = await Record.create(req.body);
      console.log('user not exist');
    }

    res.status(200).json({
      status: 'scccess',
      data: {
        record,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 'fail', message: err });
  }
});
