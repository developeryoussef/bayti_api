const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name :{
        required : true,
        type : String,
        trim :true,
    },
    description :{
        required : true,
        type : String,
        trim :true,
    },
    imageurl : {
        required : true,
        type : String,
        trim :true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "categories",
        trim : true,
        required : true,
    },
    price : {
        required: true,
        type : Number,
        
    },
    productcount : {
        type : Number,
        default : 1,
    },
} , {timestamps : true});

const Product = mongoose.model('products' , productsSchema);

module.exports = {Product};