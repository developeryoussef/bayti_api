const express = require('express');
const router = express.Router();
const { Favourites } = require("../models/favouritemodel");
const mongoose = require('mongoose');

router.use(express.json());

router.get('/get-user-favourites/:id', async (req, res) => {
    let cartList = await Favourites.find({ user: req.params.id });
    if (cartList) {
        return res.status(200).json(cartList);
    }
});

router.post('/insert-product-into-favourites/', async (req, res) => {
    if (!req.body.productId || !req.body.productId) {
        return res.status(401).json({ message: "productId required" });
    }

    else if (!req.body.user || !req.body.user) {
        return res.status(401).json({ message: "productId user" });
    }
    let product = new Favourites({
        productId: req.body.productId,
        user: req.body.user,
    });

    const result = await product.save();
    return res.status(200).json(result);
});


router.delete('/delete-product-from-favourites/:id', async (req, res) => {
    let product = await Favourites.findByIdAndDelete(req.params.id).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(404).json(err);

    });
});

module.exports = router;