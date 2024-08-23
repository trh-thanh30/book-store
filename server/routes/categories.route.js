const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { createCategory } = require("../controller/categories.controller");
const router = express.Router();

// POST
router.post("/create", verifyToken, createCategory);
module.exports = router;
