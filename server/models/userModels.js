const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isDelivery: {
    type: String,
    default: false,
  },
  isAdmin: {
    type: String,
    default: false,
  },
  orderList: {
    type: Array,
    default: [],
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
