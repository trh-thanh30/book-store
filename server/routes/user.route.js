const express = require("express");
const {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
  getAllUser,
} = require("../controller/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
// POST
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// PUT
router.put("/update-user", verifyToken, updateUser);
// DELETE
router.delete("/delete-user", verifyToken, deleteUser);
// GET
router.get("/get-users", verifyToken, getAllUser);
module.exports = router;
