const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  address: { type: Object },
  borough: { type: String },
  cuisine: { type: String },
  grades: { type: Array },
  name: { type: String },
  restaurant_id: { type: String },
});

module.exports = mongoose.model("Restaurants", RestaurantSchema);
