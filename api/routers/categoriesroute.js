const express = require('express');
const router = express.Router();
const { Categories } = require("../models/categorieschema");
const { User } = require("../models/userchema");
const mongoose = require('mongoose');

router.use(express.json());

router.get('/get-categories/', async (req, res) => {
    let categories = await Categories.find();
    return res.status(200).json(categories);
});

router.post('/insert-category/', async (req, res) => {
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
    let category = await Categories.findOne({ name: req.body.name });
    if (category) {
        return res.status(401).json({ message: "category already in use" });
    }
    if (!req.body.name) {
        return res.status(400).json({ message: "category name required" });
    }
    category = new Categories({
        name: req.body.name,
    });
    const result = await category.save();
    return res.status(201).json(result);
});

router.put('/edit-category/:id', async (req, res) => {
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
    if (!req.body.name) {
        return res.status(400).json({ message: "category name required" });

    }
    let category = await Categories.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
        }
    });
    return res.status(201).json({ message: 'updated seuccesfully', category: JSON.stringify(category) });
});

router.delete('/delete-category/:id', async (req, res) => {
    const category = await Categories.findByIdAndDelete(req.params.id);
    return res.status(201).json(category);
});


module.exports = router;