const { query, body, validationResult, check } = require("express-validator");

const createMenuValidator = () => {
  return [
    query("name").exists().isString().isLength({ min: 5 }),
    query("duration").exists().isInt(),
    query("days").exists().isString(),
    query("quantity").exists().isInt(),
  ];
};

const modifyMenuValidator = () => {
  return [
    query("name").trim().exists().isString().isLength({ min: 5 }),
    query("duration").exists().isNumeric(),
    query("days").exists(),
    query("quantity").exists().isNumeric(),
  ];
};

const removeMenuValidator = () => {
  return [query("id").trim().exists().isString()];
};

const createOrderValidator = () => {
  return [body("orderItems").exists()];
};

const modifyOrderValidator = () => {
  return [query("id").exists().isString(), query("status").exists().isString()];
};

const createUserValidator = () => {
  return [
    query("username").exists().isString().isLength({ min: 3 }),
    query("email").exists().isEmail().normalizeEmail(),
    query("password").exists().isLength({ min: 8 }).isStrongPassword(),
    query("role").exists().isString().isLength({ min: 4 }),
  ];
};

const authUserValidator = () => {
  return [
    query("email").exists().isEmail().normalizeEmail(),
    query("password").exists().isString(),
  ];
};

const validatorFunction = (req, res, next) => {
  const errors = validationResult(req);
  return errors;
};

const extractErrorMsg = (errors, next) => {
  let errorMsg = "";
  errors.array().forEach((err) => {
    errorMsg += ` ${err.param} : ${err.msg},`;
  });
  next(new Error(errorMsg));
};

module.exports = {
  createMenuValidator,
  validatorFunction,
  modifyMenuValidator,
  removeMenuValidator,
  createOrderValidator,
  modifyOrderValidator,
  createUserValidator,
  authUserValidator,
  extractErrorMsg,
};
