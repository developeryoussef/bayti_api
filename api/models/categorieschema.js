const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    name :{
        required : true,
        type : String,
        trim :true,
    },
} , {timestamps : true});

const Categories = mongoose.model('categories' , categoriesSchema);

module.exports = {Categories};