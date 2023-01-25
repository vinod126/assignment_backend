// implementations of operations on MENU items

var dataStore = require("./getDatabase");
let menu = dataStore.collection("menu");
let foodItemModule = require("./foodItemModule");

const createMenuItem = async (req, res, next) => {
  let { name, days, duration, quantity } = req.query;
  let id = name.replace(/ /gi, "_");

  try {
    let item = await menu.get(id);
    if (!item) {
      let result = await menu.create({
        id,
        name,
        duration,
        days,
        quantity,
      });
      foodItemModule.createProduct(id, name);
      res.send(result);
    } else {
      throw new Error("Duplicate record");
    }
  } catch (err) {
    next(err);
  }
};

const modifyMenuItem = async (req, res, next) => {
  let { name, days, duration, quantity } = req.query;
  let id = name.replace(/ /gi, "_");
  try {
    await menu.update({
      id,
      name,
      duration,
      days,
      quantity,
    });
    res.send("executed successfully");
  } catch (err) {
    next(err);
  }
};

const removeMenuItem = async (req, res, next) => {
  let id = req.query?.id;
  try {
    await menu.delete(id);
    const foodItems = dataStore.collection("foodItems");
    if (foodItems.get(id)) {
      foodItems.delete(id);
    }
    res.send("removed item successfully " + id);
  } catch (err) {
    next(err);
  }
};

const getMenuItems = async (req, res) => {
  let menuItems = await menu.list();
  res.send(menuItems);
};

module.exports = {
  createMenuItem,
  modifyMenuItem,
  removeMenuItem,
  getMenuItems,
};
