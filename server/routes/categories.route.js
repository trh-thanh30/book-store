const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  createCategory,
  getAllCategory,
  updateCategories,
} = require("../controller/categories.controller");
const router = express.Router();

// POST
router.post("/create", verifyToken, createCategory);

// GET
router.get("/get-all", getAllCategory);

// PUT
router.put("/update/:id", verifyToken, updateCategories);

// DELETE
router.delete("/delete/:id", verifyToken, updateCategories);
module.exports = router;
