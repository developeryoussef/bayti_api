const mongoose = require("mongoose");

const favouritesSchema = new mongoose.Schema({
    productId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        trim: true,
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
}, { timestamps: true });

const Favourites = mongoose.model('favourites', favouritesSchema);

module.exports = { Favourites };