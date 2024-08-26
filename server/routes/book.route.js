const express = require("express");
const {
  createBook,
  getAllBook,
  deleteBook,
  updateBook,
  getBookById,
} = require("../controller/book.controller");
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
router.get("/:id", getBookById);

// DELETE
router.delete("/delete/:id", verifyToken, deleteBook);

// PUT
router.put(
  "/update/:id",
  verifyToken,
  cloudinaryFileUploader.single("image"),
  updateBook
);
module.exports = router;
