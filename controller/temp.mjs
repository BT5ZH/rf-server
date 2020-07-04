const record = await Record.findOne(
    req.body._id,
    {
      $set: {
        'products.$[elem1].isFavorite': req.body.products[0].isFavorite,
      },
    },
    {
      arrayFilters: [{ 'elem1._id': req.body.products[0]._id }],
      new: true,
      upsert: true,
    },
    function (err, data) {
      console.log(data);
    }

db.collection.update(
    {
        username:"mark", 
        "operation_counts.month_id": {$ne:"2016-05"}
    }, 
    {
        $addToSet: {"operation_counts":{month_id: "2016-05", count:0}}
    }
)WriteResult({ "nMatched" : 0, "nUpserted" : 0, "nModified" : 0 })

db.collection.update(
    {
        username:"mark", 
        "operation_counts.month_id": {$ne:"2016-06"}
    }, 
    {
        $addToSet: {"operation_counts":{month_id: "2016-06", count:0}}
    }
)WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

db.collection.update(
    {
        username:"mark", 
        "operation_counts.month_id": "2016-06"
    }, 
    {
        $inc:{ "operation_counts.$.count":1 }
    }
)WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })