const mongoose = require('mongoose');

const PizzaIngredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Ingredients = mongoose.model('Ingredients', PizzaIngredientsSchema);

module.exports = Ingredients;