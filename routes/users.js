// operations on ORDER items

var express = require("express");
var router = express.Router({ mergeParams: true });
var userModule = require("../modules/userModule");
let validator = require("../modules/validators/validator");

router.post(
  "/createUser",
  validator.createUserValidator(),
  (req, res, next) => {
    let errors = validator.validatorFunction(req, res, next);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() }).send();
    } else {
      userModule.createUserItem(req, res, next);
    }
  }
);

router.get("/authUser", validator.authUserValidator(), (req, res, next) => {
  let errors = validator.validatorFunction(req, res, next);
  if (!errors.isEmpty()) {
    res.status(500).json({ errors: errors.array() }).send();
  } else {
    userModule.authUserItem(req, res, next);
  }
});

module.exports = router;
