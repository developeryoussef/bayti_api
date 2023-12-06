const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productName : {
        required : true,
        type : String,
        trim :true,
    },
    imageurl : {
        required : true,
        type : String,
    },
    price : {
        required : true,
        type : Number,
    },
    productId : {
        required : true,
        type : mongoose.Schema.Types.ObjectId,
        ref : "products",
        trim :true,
    },
    user : {
        required: true,
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
    }
} , {timestamps : true});

const Cart = mongoose.model('cart' , cartSchema);

module.exports = {Cart};