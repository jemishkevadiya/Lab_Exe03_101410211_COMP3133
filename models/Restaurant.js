const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    restaurant_id: String,
    name: String,
    cuisines: String,
    city: String,
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
