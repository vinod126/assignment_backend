// operations on ORDER items

var express = require("express");
var dataStore = require("../modules/getDatabase");
var router = express.Router({ mergeParams: true });

router.get("/getReview", (req, res, next) => {
  let review = dataStore.collection("review");
  let reviewArr = Array.from(review.list());
  let reviewItem = reviewArr.pop();
  res.send(reviewItem ? reviewItem : {});
});

router.delete("/removeReview", (req, res, next) => {
  let review = dataStore.collection("review");

  let elem = req.query.elem;
  try {
    review.delete(elem);
    res.send("success");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
