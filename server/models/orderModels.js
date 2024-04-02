const mongoose = require("mongoose");

const orderSchem = new mongoose.Schema({
  itemName: {
    type: String,
    default: "Burger",
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  mobile: {
    type: Number,
    required: [true, "Contact is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  time: {
    type: String,
    default: "30 minutes",
  },
});

const userModel = mongoose.model("order", orderSchem);

module.exports = userModel;
