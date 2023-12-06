const express = require('express');
const router = express.Router();
const { User } = require("../models/userchema");
const { Product } = require("../models/productshema");
const mongoose = require('mongoose');

router.use(express.json());

router.get('/get-products/:id', async (req, res) => {
    let products = await Product.find({ category: req.params.id });
    return res.status(200).json(products);
});

router.post('/insert-product/', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' })
    }
    let user = await User.findOne({ email: req.body.user });
    if (!user) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (user.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert category' });
    }
    let body = req.body;
    if (!body.name) {
        return res.status(401).json({ message: "name required" });
    } else if (!body.description) {
        return res.status(401).json({ message: "description required" });
    } else if (!body.category) {
        return res.status(401).json({ message: "category required" });
    } else if (!body.price) {
        return res.status(401).json({ message: "price required" });
    } else if (!body.imageurl) {
        return res.status(401).json({ message: "imageurl required" });
    }
    let product = new Product({
        name: body.name,
        description: body.description,
        price: body.price,
        imageurl: body.imageurl,
        category: body.category,
    });
    let result = await product.save();
    return res.status(201).json(result);
});

router.put('/edit-product/:id', async (req, res) => {
    if (!req.body.user) {
        return res.status(500).json({ message: 'user required' })
    }
    let user = await User.findOne({ email: req.body.user });
    if (!user) {
        return res.status(500).json({ message: 'user not found' });
    }
    if (user.role !== "admin") {
        return res.status(501).json({ message: 'you can\'t insert product' });
    }
    let body = req.body;
    let newProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: {
            name: body.name,
            description: body.description,
            price: body.price,
            imageurl: body.imageurl,
            category: body.category,
            productcount: body.productcount,
        }
    }, { new: true });
    return res.status(201).json(newProduct);
});

router.delete('/delete-product/:id', async (req, res) => {
    let product = await Product.findByIdAndDelete(req.params.id).then((result) => {
        return res.json(result);
    }).catch((err) => {
        return res.json(err);
    });;
});

module.exports = router;
