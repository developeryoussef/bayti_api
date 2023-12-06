const express = require('express');
const router = express.Router();
const { Cart } = require("../models/cartmodel");
const mongoose = require('mongoose');

router.use(express.json());

router.get('/get-user-cart/:id' , async (req , res) => {
    let cartList = await Cart.find({user : req.params.id});
    return res.status(200).json(cartList);
});

router.post('/insert-product-into-cart/' , async (req , res) => {
    if (!req.body.productName || !req.body.productName) {
        return res.status(401).json({message : "productNmae required"});
    } else if (!req.body.price || !req.body.price) {
        return res.status(401).json({message : "price required"});
    } else if (!req.body.productId || !req.body.productId) {
        return res.status(401).json({message : "productId required"});
    } 
    else if (!req.body.imageurl || !req.body.imageurl) {
        return res.status(401).json({message : "productId imageurl"});
    } 
    else if (!req.body.user || !req.body.user) {
        return res.status(401).json({message : "productId user"});
    }
    let product = new Cart({
        productName : req.body.productName,
        price : req.body.price,
        productId: req.body.productId,
        imageurl : req.body.imageurl,
        user : req.body.user,
    });

    const result = await product.save();
    return res.status(200).json(result);
});


router.delete('/delete-product-from-cart/:id' , async (req , res) => {
    let product = await Cart.findByIdAndDelete(req.params.id).then((result) => {
        return res.status(200).json(result);
    }).catch((err) => {
        return res.status(404).json(err);
        
    });
});


module.exports = router;