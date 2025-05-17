const ensureAuthenticated = require("../middlewares/auth");
const userModel = require("../models/user");
const router = require("express").Router();

router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username });

    const address = req.body.address;
    const orders = user.orders;

    user.ordersHistory.push({
      username: username,
      email: user.email,
      orders: orders,
      address: address,
    });
    user.save();
    user.myCart = [];
    user.orders = [];
    res.status(200).json({
      success: true,
      message: "ThankYou! Your Order is Confirmed and Delivered Soon...",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Server Error!",
    });
  }
});

router.get("/:user", async (req, res) => {
  const username = req.params.user;
  try {
    const user = await userModel.findOne({ username });
    const ordersHistory = user.ordersHistory;
    res.status(200).json({
      success: true,
      orderHistory: ordersHistory,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
