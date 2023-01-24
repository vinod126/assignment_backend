/*
implementations of operations on MENU items
-order can have one of four types
-Accepted , in progress
-Rejected
-Cancelled
-Completed
*/

var dataStore = require("./getDatabase");
let orders = dataStore.collection("orders");

const createOrderItem = async (req, res, next) => {
  let queryObj = req.body;
  let orderItems = queryObj?.orderItems;
  let menuItems = dataStore.collection("menu");
  let itemAvailable = true;
  let insufficientItem = "";
  let duration = 0;

  /*
    -check if order can be accepted
        1. check item 2. check quantity 3. check day
            -orderItem = { foodItemName, quantity, day };
            -menuItem = { foodItemName, Duration, days, quantity } };  
  */
  let orderItemsArr = Object.values(orderItems);
  for (let i = 0; i < orderItemsArr.length; i++) {
    let item = orderItemsArr[i];
    let MenuItem = menuItems.get(item.id);

    // this will get the max duration among ordered items
    if (parseInt(MenuItem.duration) > duration) {
      duration = parseInt(MenuItem.duration);
    }

    insufficientItem = MenuItem;
    //checks if the product is available or not
    if (!MenuItem) {
      itemAvailable = false;
      break;
    }
    //checks quantity of the ordered items
    if (MenuItem.quantity < item.quantity) {
      itemAvailable = false;
      break;
    }
    //checks if ordered item is available for that day
    if (!MenuItem.days.includes(item.day)) {
      itemAvailable = false;
      break;
    }
  }

  if (itemAvailable) {
    let review = dataStore.collection("review");

    //accepted order
    let id = orders.create({
      orderItems: Object.values(queryObj.orderItems),
      duration: duration,
      timeStamp: Date.now(),
      status: "Accepted",
    });
    let modifiedObj = { ...orders.get(id), status: "Completed" };
    setTimeout(() => {
      orders.update(modifiedObj);
      modifiedObj.orderItems.forEach((ele) => {
        review.create({ name: ele.name });
      });
    }, duration * 60000);
    res.send("created successfully");
  } else {
    //rejected order
    orders.create({
      orderItems: Object.values(queryObj.orderItems),
      duration: duration,
      timeStamp: Date.now(),
      status: "Rejected",
    });
    next(
      new Error(
        `Food item ${insufficientItem.id} not available!. available quantity is ${insufficientItem.quantity} and available on ${insufficientItem.days}`
      )
    );
  }
};

//modify order status
const modifyOrderItem = async (req, res, next) => {
  let queryObj = req.query;
  let status = queryObj.status;
  let id = queryObj.id;
  let orderOriginal = orders.get(id);
  try {
    await orders.update({
      ...orderOriginal,
      status: status,
    });
    res.send("executed successfully");
  } catch (err) {
    next(err);
  }
};

//get all orders
const getOrderItems = async (req, res) => {
  let orderItems = await orders.list();
  res.send(orderItems);
};

module.exports = {
  createOrderItem,
  modifyOrderItem,
  getOrderItems,
};
