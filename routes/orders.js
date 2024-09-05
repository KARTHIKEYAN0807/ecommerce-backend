const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Make sure this path is correct

// Place an order
router.post('/', async (req, res) => {
  const order = new Order({
    user: req.body.user,
    products: req.body.products,
    quantities: req.body.quantities,
    totalPrice: req.body.totalPrice,
    status: req.body.status
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all orders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
