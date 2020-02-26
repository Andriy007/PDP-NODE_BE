const mongoose = require('mongoose') ;

const IngredientsSeeder = require("./seeders/ingredients.seeder");
const PizzaSeeder = require("./seeders/pizza.seeder");

const config = require('./mydb');

const mongoURL = process.env.MONGO_URL || config.DB;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
module.exports  = {
  seedersList: {
    IngredientsSeeder,
    PizzaSeeder
  },
  connect: async () => await mongoose.connect(mongoURL, { useNewUrlParser: true }),
  dropdb: async () => mongoose.connection.db.dropDatabase()
};
/**
//  * Connect to mongodb implementation
//  * @return {Promise}
//  */
// export const connect = async () =>
//   await mongoose.connect(mongoURL, { useNewUrlParser: true });
// /**
//  * Drop/Clear the database implementation
//  * @return {Promise}
//  */
// export const dropdb = async () => mongoose.connection.db.dropDatabase();
