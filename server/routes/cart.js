const ensureAuthenticated = require("../middlewares/auth");
const userModel = require("../models/user");
const router = require("express").Router();

// Add to cart
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const username = req.user.username;
    const newProduct = req.body;

    const user = await userModel.findOne({ username });

    const existingProduct = user.myCart.find(
      (item) => item.name === newProduct.name
    );

    if (existingProduct) {
      existingProduct.quantity += 1; // assuming quantity is numeric
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Product quantity updated successfully",
      });
    } else {
      user.myCart.push(newProduct);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Product added Successfully!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Server Error!",
    });
  }
});

router.post("/:type", async (req, res) => {
  const id = req.body.id;
  const type = req.params.type;
  try {
    if (type === "increment") {
      userModel
        .updateOne(
          {
            "myCart._id": id,
          },
          { $inc: { "myCart.$.quantity": +1 } }
        )
        .then(() => {
          res.status(200).json({
            success: true,
            message: "Product quantity updated successfully",
          });
        });
    } else if (type === "decrement") {
      const user = await userModel.findOne({ "myCart._id": id });

      const product = user?.myCart.find((item) => item._id == id);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      if (product.quantity <= 1) {
        return res
          .status(400)
          .json({ success: false, message: "Cannot decrement below 1" });
      }
      userModel
        .updateOne(
          {
            "myCart._id": id,
          },
          { $inc: { "myCart.$.quantity": -1 } }
        )
        .then(() => {
          res.status(200).json({
            success: true,
            message: "Product quantity updated successfully",
          });
        });
    }
  } catch (err) {
    console.error(err);
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
    userModel
      .findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found Please Login",
          });
        }
        return user.myCart;
      })
      .then((product) => {
        res.status(200).json({
          success: true,
          products: product,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          success: false,
          error: err.message,
          message: "Internal Server Error!",
        });
      });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:user/:id/:name", async (req, res) => {
  const username = req.params.user;
  const id = req.params.id;
  const name = req.params.name;

  try {
    // Remove the product from myCart
    await userModel.updateOne(
      { username: username },
      { $pull: { myCart: { _id: id } } }
    );
    await userModel.updateOne(
      { username: username },
      { $pull: { orders: { name: name } } }
    );
    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// place Order
router.post("/order/:user", ensureAuthenticated, async (req, res) => {
  const username = req.params.user;

  try {
    const user = await userModel.findOne({ username: username });

    const orderData = user.myCart.map((item) => {
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        totalAmount: parseInt(item.price) * parseInt(item.quantity),
      };
    });

    // Clone existing orders
    let updatedOrders = [...user.orders];

    orderData.forEach((newItem) => {
      const existingOrder = updatedOrders.find(
        (order) => order.name === newItem.name
      );

      if (existingOrder) {
        existingOrder.quantity = newItem.quantity;
        existingOrder.totalAmount = newItem.totalAmount;
      } else {
        updatedOrders.push(newItem);
      }
    });

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { orders: updatedOrders } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Orders updated successfully",
      data: updatedUser.orders,
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

router.get("/order/:user", async (req, res) => {
  const username = req.params.user;

  try {
    const user = await userModel.findOne({ username: username });
    const order = user.orders;
    res.status(200).json({
      status: "success",
      orders: order,
    });
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;
