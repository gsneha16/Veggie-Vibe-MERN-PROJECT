const ensureAuthenticated = require("../middlewares/auth");
const userModel = require("../models/user");
const router = require("express").Router();

router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const username = req.user.username;
    const newProduct = req.body;

    userModel.findOne({ username }).then((user) => {
      user.wishlist.push(newProduct);
      return user.save();
    });
    res.status(200).json({
      success: true,
      message: "Product added Successfully!",
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
    userModel
      .findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
        return user.wishlist;
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

router.delete("/:user/:id", async (req, res) => {
  const username = req.params.user;
  const id = req.params.id;
  try {
    // Remove the product from myCart
    await userModel.updateOne(
      { username: username },
      { $pull: { wishlist: { _id: id } } }
    );
    res.status(200).json({
      success: true,
      message: "Product removed from Wislist successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
