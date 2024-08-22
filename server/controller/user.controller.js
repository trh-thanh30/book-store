const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.models");
const register = async (req, res) => {
  // xu li cac van de khi user chua nhap du lieu dang ky
  const { username, email, password } = req.body;
  if (!username) return res.status(400).send("Username is required");
  if (!email) return res.status(400).send("Email is required");
  if (!password) return res.status(400).send("Password is required");
  const extingUser = await User.findOne({ email });
  if (extingUser) return res.status(400).send("User already exists");

  try {
    // bam mat khau thanh cac ma ky tu bat ki
    const passwordHash = bcryptjs.hashSync(password, 10);
    // xu li dang ky va luu vao db
    const newUser = new User({ username, email, password: passwordHash });
    await newUser.save();
    return res.status(200).json({ message: "User register successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = { register };
