// operations on MENU items

var express = require("express");
var router = express.Router({ mergeParams: true });
var menuModule = require("../modules/menuModule");
let validator = require("../modules/validators/validator");

/**
 * @swagger
 * /menu/createMenuItem:
 *    post:
 *      description: Auto generated using Swagger Inspector
 *      parameters:
 *        - name: duration
 *          in: query
 *          schema:
 *            type: string
 *          example: '0'
 *        - name: quantity
 *          in: query
 *          schema:
 *            type: string
 *          example: '0'
 *        - name: name
 *          in: query
 *          schema:
 *            type: string
 *          example: Mango%20Shake
 *        - name: days
 *          in: query
 *          allowEmptyValue: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Auto generated using Swagger Inspector
 *          content:
 *            text/html; charset=utf-8:
 *              schema:
 *                type: string
 */
router.post(
  "/createMenuItem",
  validator.createMenuValidator(),
  (req, res, next) => {
    let errors = validator.validatorFunction(req, res);
    if (!errors.isEmpty()) {
      validator.extractErrorMsg(errors, next);
    } else {
      menuModule.createMenuItem(req, res, next);
    }
  }
);

/**
 *@swagger
 * /menu/getMenuItems:
 *    get:
 *      produces:
 *        - application/json
 *      parameters: []
 *      responses:
 *        '200':
 *          description: Definition generated from Swagger Inspector
 *          schema:
 *            $ref: '#/definitions/Model0'
 * definitions:
 *  Array:
 *    properties:
 *      id:
 *        type: string
 *      name:
 *        type: string
 *      duration:
 *        type: string
 *      days:
 *        type: string
 *      quantity:
 *        type: string
 *  Model0:
 *    type: array
 *    items:
 *      $ref: '#/definitions/Array'
 */
router.get("/getMenuItems", (req, res) => {
  menuModule.getMenuItems(req, res);
});

/**
 * @swagger
 * /menu/modifyMenuItem:
 *    put:
 *      consumes:
 *        - application/json
 *      produces:
 *        - text/html
 *      parameters:
 *        - name: duration
 *          in: query
 *          required: false
 *          type: string
 *          x-example: '10'
 *        - name: quantity
 *          in: query
 *          required: false
 *          type: string
 *          x-example: '500'
 *        - name: name
 *          in: query
 *          required: false
 *          type: string
 *          x-example: Jolad_Rotti
 *        - name: days
 *          in: query
 *          required: false
 *          type: string
 *          x-example: Tuesday,Wednesday,Friday
 *      responses:
 *        '200':
 *          description: Definition generated from Swagger Inspector
 *          schema:
 *            type: string
 */
router.put(
  "/modifyMenuItem",
  validator.modifyMenuValidator(),
  (req, res, next) => {
    let errors = validator.validatorFunction(req, res);
    if (!errors.isEmpty()) {
      validator.extractErrorMsg(errors, next);
    } else {
      menuModule.modifyMenuItem(req, res, next);
    }
  }
);

/**
 *@swagger
 * /menu/removeMenuItem:
 *   delete:
 *     consumes:
 *       - application/json
 *     produces:
 *       - text/html
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         type: string
 *         x-example: Mango_Shake
 *     responses:
 *       '200':
 *         description: Returns success information
 *         schema:
 *           type: string
 */
router.delete(
  "/removeMenuItem",
  validator.removeMenuValidator(),
  (req, res, next) => {
    let errors = validator.validatorFunction(req, res);
    if (!errors.isEmpty()) {
      validator.extractErrorMsg(errors, next);
    } else {
      menuModule.removeMenuItem(req, res, next);
    }
  }
);

module.exports = router;
