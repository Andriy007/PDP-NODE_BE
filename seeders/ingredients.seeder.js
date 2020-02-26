const { Seeder } = require('mongoose-data-seed') ;
const  Ingredients  = require('../models/Ingredients');

const data = [
  {
    name: "Crust",
    price: "20"
  },
  {
    name: "Cheese",
    price: "15"
  },
  {
    name: "Mushroom",
    price: "10"
  },
  {
    name: "Tomato",
    price: "5"
  },
  {
    name: "Onions",
    price: "3"
  },
  {
    name: "Pineapple",
    price: "10"
  },
  {
    name: "Extra-virgin olive oil",
    price: "2"
  },
  {
    name: "Fresh basil",
    price: "2"
  },
  {
    name: "Salami",
    price: "10"
  },
  {
    name: "Ham",
    price: "10"
  },
  {
    name: "Tuna",
    price: "30"
  },
  {
    name: "Chicken",
    price: "10"
  },
  {
    name: "Egg",
    price: "15"
  },
  {
    name: "Corn",
    price: "10"
  }
];

class IngredientsSeeder extends Seeder {

  async shouldRun() {
    return Ingredients.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Ingredients.create(data);
  }
}

module.exports = IngredientsSeeder;
