const cloudinary = require("../../config/cloudinary");
const user = require("../../models/user.model");

const updateProfile = async (req, res) => {
  const userId = req.params.id;
  const { username, email, bio } = req.body;

  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  try {
    const userToUpdate = await user.findById(userId);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Update fields
    userToUpdate.username = username ?? userToUpdate.username;
    userToUpdate.email = email ?? userToUpdate.email;
    userToUpdate.bio = bio ?? userToUpdate.bio;

    // 🔥 Upload to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pics" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      userToUpdate.profilePic = result.secure_url; // ✅ IMPORTANT
    }

    const updatedUser = await userToUpdate.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
};

module.exports = updateProfile;