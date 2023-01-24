// operations on ORDER items

var express = require("express");
var router = express.Router({ mergeParams: true });
var orderModule = require("../modules/orderModule");
let validator = require("../modules/validators/validator");

router.post(
  "/createOrder",
  validator.createOrderValidator(),
  (req, res, next) => {
    let errors = validator.validatorFunction(req, res);
    if (!errors.isEmpty()) {
      validator.extractErrorMsg(errors, next);
    } else {
      orderModule.createOrderItem(req, res, next);
    }
  }
);

router.get("/getOrderItems", (req, res) => {
  orderModule.getOrderItems(req, res);
});

router.put(
  "/modifyOrderItems",
  validator.modifyOrderValidator(),
  (req, res, next) => {
    let errors = validator.validatorFunction(req, res);
    if (!errors.isEmpty()) {
      validator.extractErrorMsg(errors, next);
    } else {
      orderModule.modifyOrderItem(req, res, next);
    }
  }
);

module.exports = router;
