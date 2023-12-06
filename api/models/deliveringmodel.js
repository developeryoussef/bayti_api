const mongoose = require("mongoose");

const deliveringSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        required: true,
        trim: true,
    },
    deliveryUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        trim: true,
    },
}, { timestamps: true });

const Delivering = mongoose.model('delivering', deliveringSchema);

module.exports = { Delivering };