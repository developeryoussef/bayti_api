const express = require('express');
const router = express.Router();
const { User } = require("../../models/userchema");
const { Order } = require("../../models/orderschema");
const { OrderItem } = require('../../models/order-product');
const { Delivering } = require('../../models/deliveringmodel');
const mongoose = require('mongoose');

router.use(express.json());

router.post('/get-delivery-orders/', async (req, res) => {
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
    let deliveryOrders = await Delivering.find({ deliveryUser: deliveryuser }).populate('order');
    if (!deliveryOrders) {
        return res.status(404).json({ message: 'Error occured' });
    }
    else if (deliveryOrders) {
        return res.status(200).json(deliveryOrders);
    }
});

module.exports = router;