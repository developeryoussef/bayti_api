const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name :{
        required : true,
        type : String,
        trim :true,
    },email :{
        required : true,
        type : String,
        unique : true,
        trim :true,
    },
    phone :{
        required : true,
        type : String,
        unique : true,
        trim :true,
    },
    password : {
        required : true,
        type :String,
        minlength : 6,
    },
    // location : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'location',
    // },
    role :{
        type :String,
        enum : ['user' , 'delivery' , 'admin'],
        default : 'user'
    },
} , {timestamps : true});

const User = mongoose.model('users' , userSchema);

module.exports = {User};