const mongoose = require('mongoose');
const Schema = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  pizzaId: [{ type: Schema.ObjectId, ref: 'pizza' }]
});

const Orders = mongoose.model('orders', OrdersSchema);

module.exports = Orders;
