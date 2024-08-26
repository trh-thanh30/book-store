const express = require("express");
const { createBook, getAllBook } = require("../controller/book.controller");
const verifyToken = require("../middleware/verifyToken");
const cloudinaryFileUploader = require("../utils/uploadImage");
const router = express.Router();

// POST
router.post(
  "/create",
  verifyToken,
  cloudinaryFileUploader.single("image"),
  createBook
);

// GET
router.get("/get-all", getAllBook);
module.exports = router;
