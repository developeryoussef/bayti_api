const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ordersItem',
        required: true
    }],
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        // 0 = processing , 1 = accepted , 2 = rejected , 3 = plugging , 4 = finished
        enum: ['0', '1', '2', '3', '4'],
        default: '0',
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },


}, { timestamps: true });

const Order = mongoose.model('orders', orderSchema);

module.exports = { Order };