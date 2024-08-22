const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.models");
const register = async (req, res) => {
  // xu li cac van de khi user chua nhap du lieu dang ky
  const { username, email, password } = req.body;
  if (!username)
    return res
      .status(400)
      .json({ message: "Username is required", success: false });
  if (!email)
    return res
      .status(400)
      .json({ message: "Email is required", success: false });
  if (!password)
    return res
      .status(400)
      .json({ message: "Password is required", success: false });
  const extingUser = await User.findOne({ email });
  if (extingUser)
    return res
      .status(400)
      .json({ message: "User already exists", success: false });

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
const login = async (req, res) => {
  // xu li cac van de khi user chua nhap du lieu dang nhap
  const { email, password } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ message: "Email is required", success: false });
  if (!password)
    return res
      .status(400)
      .json({ message: "Password is required", success: false });

  // kiem tra xem user da co tren db chua
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ message: "User not found", success: false });
  // kiem tra mat khau cua user
  const isMatch = bcryptjs.compareSync(password, user.password);
  if (!isMatch)
    return res
      .status(401)
      .json({ message: "Invalid credentials", success: false });
  try {
    // tao token cho user
    const expiryDate = new Date(Date.now() + 3600000);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    const { password, ...rest } = user._doc;
    return res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { username, email } = req.body;
  if (!id)
    return res.status(400).json({ message: "User not found", success: false });
  try {
    let userUpdate = { username, email };
    if (req.file) {
      userUpdate.profilePicture = req.file?.path;
    }
    const user = await User.findByIdAndUpdate(id, userUpdate, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "User updated successfully", user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.user;
  if (!id)
    return res.status(400).json({ message: "User not found", success: false });
  try {
    const userDelete = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "User deleted successfully", user: userDelete });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const getAllUser = async (req, res) => {
  const { role } = req.user;
  try {
    if (role !== "admin")
      return res.status(403).json({
        message: "Unauthorized to access this resource",
        success: false,
      });
    const users = await User.find({});
    return res
      .status(200)
      .json({ message: "Users fetched successfully", users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
  getAllUser,
};
