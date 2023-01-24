var express = require("express");
var router = express.Router();
var foodItemModule = require("../modules/foodItemModule");
router.get("/", (req, res, next) => {
  foodItemModule.getItems(req, res);
});

module.exports = router;
