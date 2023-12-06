const express = require('express');
const router = express.Router();
const { User } = require("../../models/userchema");
const { Order } = require("../../models/orderschema");
const { OrderItem } = require('../../models/order-product');
const { Delivering } = require('../../models/deliveringmodel');
const mongoose = require('mongoose');

router.use(express.json());

router.post('/tracking-order-plugging/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' });
    }
    let deliveryuser = await User.findOne({ email: req.body.user });
    if (!deliveryuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (deliveryuser.role !== "delivery") {
        return res.status(501).json({ message: 'you can\'t get delivery orders' });
    }
    if (req.body.status !== 'plugging') {
        return res.status(401).json({ message: "wrong parameters passed" });
    } else if (!req.body.order) {
        return res.status(401).json({ message: "order required" });
    }
    let order = await Order.findOne({ id: req.body.order, });
    let pluggingOrder = await Order.findByIdAndUpdate(req.body.order, {
        $set: {
            status: 3,
        },
    }, { new: true });
    if (pluggingOrder) {
        return res.status(200).json(pluggingOrder);
    } else if (!pluggingOrder) {
        return res.status(200).json({ message: "error occured" });
    }
});

router.post('/tracking-order-finished/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' });
    }
    let deliveryuser = await User.findOne({ email: req.body.user });
    if (!deliveryuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (deliveryuser.role !== "delivery") {
        return res.status(501).json({ message: 'you can\'t get delivery orders' });
    }
    if (req.body.status !== 'plugging') {
        return res.status(401).json({ message: "wrong parameters passed" });
    } else if (!req.body.order) {
        return res.status(401).json({ message: "order required" });
    }
    let pluggingOrder = await Order.findByIdAndUpdate(req.body.order, {
        $set: {
            status: 4,
        },
    }, { new: true });
    if (pluggingOrder) {
        return res.status(200).json(pluggingOrder);
    } else if (!pluggingOrder) {
        return res.status(200).json({ message: "error occured" });
    }
});

module.exports = router;