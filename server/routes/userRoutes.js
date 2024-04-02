const express = require("express");
const {
  loginController,
  registerControllers,
  authController,
  getOrder,
  deliverOrder,
} = require("../controllers/userCtrls");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerControllers);
router.post("/getUserData", authMiddleware, authController);
router.post("/order", authMiddleware, getOrder);
router.get("/deliver-order", authMiddleware, deliverOrder);

module.exports = router;
