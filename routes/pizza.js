const express = require('express');
const router = express.Router();
const passport = require('passport');

const Pizza = require('../models/pizza');
const Orders = require("../models/orders");


// GET - ALL PIZZAS - \\
router.get("/pizzas", async (req, res, next) => {

  const resPerPage = req.query.page_size || 5; // results per page
  const page = req.query.page || 1;


  const sorting = {};

  if (req.query.price_ordering) {
    sorting.price = req.query.price_ordering === "DESC" ? -1 : 1
  }

  try {

      const foundProducts = await Pizza.find({})
        .sort(sorting)
        .skip((resPerPage * page) - resPerPage)
        .limit(parseInt(resPerPage));
      // Count how many products were found
      const numOfProducts = await Pizza.count({});

      return res.status(200).json({
        products: foundProducts,
        currentPage: page,
        pages: Math.ceil(numOfProducts / resPerPage),
        numOfResults: numOfProducts
      });

  } catch (err) {
    return next(err)
  }
});

//GET SINGLE PIZZA
router.get("/pizza/:id", async (req, res, next) => {

  try {
    const foundSinglePizza = await Pizza.find({ _id: req.params.id });

    return res.status(200).json({
      pizza: foundSinglePizza
    })
  } catch (err) {
    return next(err)
  }

});

router.post("/pizza/orders", async (req, res, next) => {

  try {
    const {quantity, phone, pizzaId} = req.body;
    const foundSinglePizza = await Pizza.findOne({ _id: pizzaId });
    const total = foundSinglePizza.price * quantity;

    await Orders.create({
      phone, quantity, total, pizzaId
    });

    return res.status(200).send()

  } catch (err) {
    return next(err)
  }

});

module.exports = router;
