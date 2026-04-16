// controllers/userLogin.controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../models/user.model"); // your Mongoose model 


const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
    // 1. Check if user exists
    const foundUser = await user.findOne({ username });
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { id: foundUser._id, username: foundUser.username },
      process.env.JWT_SECRET,
      {expiresIn:process.env.JWT_EXPIRATION}
    );


    // Set token in cookie
    res.cookie("token",token,{
      httpOnly: true, // prevent client-side access to the cookie
      secure: false, // true in production with HTTPS
      sameSite: "lax", // adjust based on your needs
      path: "/", 
    });
    

    // 4. Send response
    res.status(200).json({
      message: "Login successful",
      user: { id: foundUser._id, username: foundUser.username, email: foundUser.email },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = loginUser;
