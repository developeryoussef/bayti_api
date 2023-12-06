const express = require('express');
const router = express.Router();
const { User } = require("../models/userchema");
const { Order } = require("../models/orderschema");
const { OrderItem } = require('../models/order-product');
const { Product } = require("../models/productshema");
const mongoose = require('mongoose');

router.use(express.json());

router.post('/get-user-orders/', async (req, res) => {
    if (!req.body.user) {
        return res.status(400).json({ message: "user required" })
    }
    let orders = await Order.find({ user: req.body.user }).populate('orderItems');
    if (orders) {
        return res.status(200).json(orders);
    }
    else {
        return res.status(404).json({ message: 'error occured' })
    }
});

router.post('/make-order/', async (req, res) => {
    if (!req.body.user) {
        return res.status(401).json({ message: "user required" });
    } else if (!req.body.address) {
        return res.status(401).json({ message: "address required" });
    } else if (!req.body.orderItems) {
        return res.status(401).json({ message: "items required" });
    }

    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
        let productQuantity = await Product.findOne({ _id: orderItem.product });
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        });
        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved = await orderItemsIds;

    let order = new Order({
        user: req.body.user,
        orderItems: orderItemsIdsResolved,
        address: req.body.address,
    });
    let result = await order.save();
    return res.status(200).json(result);
});

module.exports = router;