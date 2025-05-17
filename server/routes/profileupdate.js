const userModel = require("../models/user");
const router = require("express").Router();
const multer = require("../multer");

router.get("/:user", async (req, res) => {
  const username = req.params.user;
  const user = await userModel.findOne({ username });
  const email = user.email;
  const profileImg = user.profileImg;
  const signInDate = user.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  res.status(200).json({
    success: true,
    email: email,
    date: signInDate,
    profileImg:profileImg,
    message:"User data Fetched successfully"
  });
});

router.post("/:user", multer.single("profilePic"), async (req, res) => {
  const username = req.params.user;
  const fileName = req.file.filename; // Log the file information

  try {
    await userModel.findOneAndUpdate(
      { username: username },
      { profileImg: fileName },
      { new: true }
    );

    res.status(200).json({
      success: true,
      profilePic: fileName,
      message: "Profile picture updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
