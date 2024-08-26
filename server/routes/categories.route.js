const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  createCategory,
  getAllCategory,
} = require("../controller/categories.controller");
const router = express.Router();

// POST
router.post("/create", verifyToken, createCategory);

// GET
router.get("/get-all", getAllCategory);


module.exports = router;
