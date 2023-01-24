var dataStore = require("./getDatabase");

const getItems = async (req, res) => {
  let foodItems = await dataStore.collection("foodItems");
  let totalItems = foodItems.list().length;
  let offset = parseInt(req.query["offset"]);
  foodItems = foodItems.list().slice(offset, offset + 10);
  res.send({
    length: totalItems,
    data: foodItems,
  });
};

let getRandomItems = (arr) => {
  const random = Math.floor(Math.random() * arr.length);
  return arr[random];
};

const createProduct = async (id, name) => {
  const styleArray = [
    "South Indian",
    "North Indian",
    "Fast Food",
    "Italian",
    "Chineese",
    "Fast Food",
    "Mexican",
    "Indian",
  ];
  const spiceArray = ["low", "medium", "high"];
  const veganArray = ["yes", "No"];
  const costArray = [
    100, 200, 300, 400, 500, 600, 350, 450, 250, 180, 140, 90, 120,
  ];
  const imagesArray = [
    "/static/images/img1.jpg",
    "/static/images/img2.jpg",
    "/static/images/img3.jpg",
    "/static/images/img4.jpg",
    "/static/images/img5.jpg",
    "/static/images/img6.jpg",
    "/static/images/img7.jpg",
    "/static/images/img8.jpg",
    "/static/images/img9.jpg",
  ];

  let style = getRandomItems(styleArray);
  let spiceLevel = getRandomItems(spiceArray);
  let isVegan = getRandomItems(veganArray);
  let cost = getRandomItems(costArray);
  let img = getRandomItems(imagesArray);

  let foodItems = await dataStore.collection("foodItems");
  if (!foodItems.get(id)) {
    foodItems.create({
      id,
      name,
      style,
      spiceLevel,
      isVegan,
      cost,
      img,
    });
  }
};

module.exports = { getItems, createProduct };
