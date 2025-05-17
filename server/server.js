const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require("cors");
const Auth = require("./routes/auth");
const cart = require("./routes/cart");
const orderHistory = require("./routes/orderHistory");
const Wishlist = require("./routes/wishlist");
const ProfileUpdate = require("./routes/profileupdate");

dotenv.config();
require("./models/db");

// App Setup
const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use("/auth", Auth);
app.use("/cart", cart);
app.use("/orderHistory", orderHistory);
app.use("/wishlist", Wishlist);
app.use("/profileUpdate", ProfileUpdate);


// Serve React Frontend
app.use(express.static(path.resolve(__dirname, "../client/dist")));
// Serve static folder for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// React Frontend Catch-All Route (MUST be after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// Test Route
app.get("/", (req, res) => {
  res.send("Running....");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
