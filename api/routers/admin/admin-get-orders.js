const express = require('express');
const router = express.Router();
const { User } = require("../../models/userchema");
const { Order } = require("../../models/orderschema");
const { OrderItem } = require('../../models/order-product');
const mongoose = require('mongoose');

router.use(express.json());

router.post('/get-all-orders/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' })
    }
    let adminuser = await User.findOne({ email: req.body.user });
    if (!adminuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (adminuser.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert category' });
    }
    let orders = await Order.find().populate('orderItems');
    if (orders) {
        return res.status(200).json(orders);
    }
    else {
        return res.status(404).json({ message: 'error occured' })
    }
});

router.post('/get-processing-orders/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' })
    }
    let adminuser = await User.findOne({ email: req.body.user });
    if (!adminuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (adminuser.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert category' });
    }
    let orders = await Order.find({ status: 0 }).populate('orderItems');
    if (orders) {
        return res.status(200).json(orders);
    }
    else {
        return res.status(404).json({ message: 'error occured' })
    }
});

router.post('/get-accepted-orders/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' })
    }
    let adminuser = await User.findOne({ email: req.body.user });
    if (!adminuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (adminuser.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert category' });
    }
    let orders = await Order.find({ status: 1 }).populate('orderItems');
    if (orders) {
        return res.status(200).json(orders);
    }
    else {
        return res.status(404).json({ message: 'error occured' })
    }
});

router.post('/get-rejected-orders/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' })
    }
    let adminuser = await User.findOne({ email: req.body.user });
    if (!adminuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (adminuser.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert category' });
    }
    let orders = await Order.find({ status: 2 }).populate('orderItems');
    if (orders) {
        return res.status(200).json(orders);
    }
    else {
        return res.status(404).json({ message: 'error occured' })
    }
});

router.post('/get-plugging-orders/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' })
    }
    let adminuser = await User.findOne({ email: req.body.user });
    if (!adminuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (adminuser.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert category' });
    }
    let orders = await Order.find({ status: 3 }).populate('orderItems');
    if (orders) {
        return res.status(200).json(orders);
    }
    else {
        return res.status(404).json({ message: 'error occured' })
    }
});

router.post('/get-finished-orders/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' })
    }
    let adminuser = await User.findOne({ email: req.body.user });
    if (!adminuser) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (adminuser.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert category' });
    }
    let orders = await Order.find({ status: 4 }).populate('orderItems');
    if (orders) {
        return res.status(200).json(orders);
    }
    else {
        return res.status(404).json({ message: 'error occured' })
    }
});

module.exports = router;