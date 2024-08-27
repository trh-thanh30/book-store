const express = require("express");
const {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
  getAllUser,
  changePassword,
  wishList,
} = require("../controller/user.controller");
const verifyToken = require("../middleware/verifyToken");
const cloudinaryFileUploader = require("../utils/uploadImage");
const router = express.Router();
// POST
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// PUT
router.put(
  "/update-user",
  verifyToken,
  cloudinaryFileUploader.single("profilePicture"),
  updateUser
);
router.put("/refesh-paasword", verifyToken, changePassword);
// DELETE
router.delete("/delete-user/:id", verifyToken, deleteUser);
// GET
router.get("/get-users", verifyToken, getAllUser);

module.exports = router;
