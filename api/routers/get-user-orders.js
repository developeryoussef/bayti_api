const express = require('express');
const router = express.Router();
const { User } = require("../models/userchema");
const { Order } = require("../models/orderschema");
const { OrderItem } = require('../models/order-product');
const mongoose = require('mongoose');
const { Delivering } = require('../models/deliveringmodel');

router.use(express.json());

router.post('/get-user-recent-orders/', async (req, res) => {
    if (!req.body.user) {
        return res.status(401).json({ message: "user required" });
    }
    let user = await User.findOne({ _id: req.body.user });
    console.log(user);
    if (!user) {
        return res.status(401).json({ message: "user not found" });
    } else if (user) {
        let userOrders = await Order.find({ user: user.id });
        if (!userOrders) {
            return res.status(401).json({ message: "error occured" });
        }
        else if (userOrders) {
            return res.status(200).json(userOrders);
        }
    }
});

router.delete('/delete-user-order/', async (req, res) => {
    if (!req.body.user) {
        return res.status(401).json({ message: "user required" });
    }
    else if (!req.body.order) {
        return res.status(401).json({ message: "order required" });
    }
    let user = await User.findOne({ _id: req.body.user });
    console.log(user);
    if (!user) {
        return res.status(401).json({ message: "user not found" });
    } else if (user) {
        let order = await Order.findByIdAndDelete(req.body.order);
        let deliveryOrder = await Delivering.findByIdAndDelete(req.body.order);
        if (order && deliveryOrder) {
            return res.status(200).json({ message: 'deleted successfully' })
        }
        else if (!order && !deliveryOrder) {
            return res.status(401).json({ message: "can't delete" });
        }
    }
});

module.exports = router;