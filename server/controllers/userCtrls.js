const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const orderModel = require("../models/orderModels");

const registerControllers = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(200)
        .send({ Message: "User Already Exist", success: false });
    }

    let { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;

    const newUser = new userModel({
      name: name,
      email: email,
      password: password,
    });

    const savedUser = await newUser.save();
    res.status(201).send({ message: "Register successfull", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register controllers Error:  ${error}`,
    });
  }
};

// login function
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(200)
        .send({ message: `user Not Found`, success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .send({ message: `Invalid emial or password`, success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login: ${error.message}` });
  }
};

// Auth || PATH
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        messgae: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// Order Auth

const getOrder = async (req, res) => {
  try {
    const newOrder = await orderModel(req.body);
    await newOrder.save();
    const isDeliveryBoy = await userModel.findOne({ isDelivery: true });

    const orderList = isDeliveryBoy.orderList;

    orderList.push({
      data: {
        orderId: newOrder._id,
        name: newOrder.name,
        mobile: req.body.mobile,
        time: req.body.time,
        address: req.body.address,
      },
    });

    await userModel.findOneAndUpdate(isDeliveryBoy._id, { orderList });
    res.status(201).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

// Delivery Boy get order details
const deliverOrder = async (req, res) => {
  try {
    const orderList = await userModel.findOne({ isDelivery: true });
    const orders = orderList.data;

    res.send(orders);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginController,
  registerControllers,
  authController,
  getOrder,
  deliverOrder,
};
