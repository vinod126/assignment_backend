const { DataStore } = require("notarealdb");

const database = new DataStore("../data");

module.exports = database;
