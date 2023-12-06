const express = require('express');
const router = express.Router();
const { User } = require("../../models/userchema");
const { Order } = require("../../models/orderschema");
const { OrderItem } = require('../../models/order-product');
const { Delivering } = require('../../models/deliveringmodel');
const mongoose = require('mongoose');

router.use(express.json());

router.post('/delivery-employment/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' });
    }
    let adminuser = await User.findOne({ email: req.body.user });
    if (!adminuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (adminuser.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert category' });
    }
    if (!req.body.deliveryUser) {
        return res.status(401).json({ message: "delivery required" });
    } else if (!req.body.order) {
        return res.status(401).json({ message: "order required" });
    }
    console.log(req.body.deliveryUser)
    let userDelivery = await User.findOne({ email: req.body.deliveryUser });
    console.log(userDelivery);
    if (!userDelivery) {
        return res.status(404).json({ message: 'delivery not found' });
    }
    else if (userDelivery.role !== "delivery") {
        return res.status(401).json({ message: "itsn't a delivery" });
    }
    let delivery_employment = new Delivering({
        deliveryUser: userDelivery.id,
        order: req.body.order,
    });
    let result = await delivery_employment.save();
    if (result) {
        let acceptOrder = await Order.findByIdAndUpdate(req.body.order, {
            $set: {
                status: "1",
            },
        }, { new: true });
        if (acceptOrder) {
            return res.status(201).json(result);
        }
    }
});

router.post('/admin-order-reject/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' });
    }
    let adminuser = await User.findOne({ email: req.body.user });
    if (!adminuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (adminuser.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert category' });
    }

    let acceptOrder = await Order.findByIdAndUpdate(req.body.order, {
        $set: {
            status: "2",
        },
    }, { new: true });
    if (acceptOrder) {
        return res.status(201).json(result);
    }
    else {
        return res.status(404).json({ message: "error occured" });
    }
});

module.exports = router;