const { Seeder } = require('mongoose-data-seed') ;
const Pizza = require("../models/pizza");
const Ingredients = require("../models/Ingredients");

const getIngredients = async (list) => {
  return await Ingredients.find({name: {$in: list}})
};
const getPrice = async (list) => {
  let total = await Ingredients.aggregate(
    [
      { $match: {name: {$in: list}} },
      { $group: {_id: null, price: {$sum: "$price" }}}
      ]
  );
  return total[0].price
};

class PizzaSeeder extends Seeder {

  async shouldRun() {
    return Pizza.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    const data = [
      {
        name: "Margherita",
        default: true,
        price: await getPrice(["Crust","Cheese", "Tomato", "Fresh basil"]),
        ingredients: await getIngredients(["Crust","Cheese", "Tomato", "Fresh basil"])
      },
      {
        name: "Calzone",
        default: true,
        price: await getPrice(["Crust", "Cheese", "Tomato", "Salami", "Egg"]),
        ingredients: await getIngredients(["Crust", "Cheese", "Tomato", "Salami", "Egg"])
      },
      {
        name: "Hawaii",
        default: true,
        price: await getPrice(["Crust", "Chicken", "Tomato", "Pineapple", "Extra-virgin olive oil"]),
        ingredients: await getIngredients(["Crust", "Chicken", "Tomato", "Pineapple", "Extra-virgin olive oil"])
      },
      {
        name: "Salami",
        default: true,
        price: await getPrice(["Crust", "Tomato", "Cheese", "Salami"]),
        ingredients: await getIngredients(["Crust", "Tomato", "Cheese", "Salami"])
      },
      {
        name: "Capricciosa",
        default: true,
        price: await getPrice(["Crust", "Cheese", "Mushroom", "Ham", "Fresh basil", "Onions"]),
        ingredients: await getIngredients(["Crust", "Cheese", "Mushroom", "Ham", "Fresh basil", "Onions"])
      },
      {
        name: "Vegetarian",
        default: true,
        price: await getPrice(["Crust", "Corn", "Cheese", "Fresh basil", "Tomato"]),
        ingredients: await getIngredients(["Crust", "Corn", "Cheese", "Fresh basil", "Tomato"])
      }
    ];
    return Pizza.create(data);
  }
}

module.exports = PizzaSeeder;