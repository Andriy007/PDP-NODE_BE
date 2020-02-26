const mongoose = require('mongoose');
const Schema = require("mongoose");

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  default: Boolean,
  ingredients: Array
});

const Pizza = mongoose.model('pizza', PizzaSchema);

module.exports = Pizza;