const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { username, email, password,contact } = req.body;
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User is already registered",
        success: false,
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new userModel({ username, email, password: hashedPassword, contact });
    await newUser.save();
    res.status(201).json({
      message: "Signup Successful",
      success: true,
    });
  } catch (err) {
    console.error("Signup Error:", err); // Log the error
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username,contact, password } = req.body;
    const existingUser = await userModel.findOne({ contact});
    const errMsg = "Auth failed username or password is wrong";

    if (!existingUser) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { username: existingUser.username, _id: existingUser._id },
      process.env.JWT_SECRET,
      // { expiredIn: "24h" }
    );

    res.status(201).json({
      message: "login Successful",
      success: true,
      jwtToken,
      name: existingUser.username,
    });
  } catch (err) {
    console.error("login Error:", err); // Log the error
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

module.exports = { signup,login };
