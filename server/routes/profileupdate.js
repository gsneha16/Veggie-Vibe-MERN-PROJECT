const userModel = require("../models/user");
const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer");

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
    profileImg: profileImg,
    message: "User data Fetched successfully",
  });
});

router.post("/:user", upload.single("profilePic"), async (req, res) => {
  cloudinary.uploader.upload(req.file.path, async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error uploading image to cloudinary",
      });
    }

    const username = req.params.user;

    await userModel.findOneAndUpdate(
      { username },
      { profileImg: result.url },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: result.url,
    });
  });
});

module.exports = router;
