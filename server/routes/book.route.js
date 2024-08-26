const express = require("express");
const {
  createBook,
  getAllBook,
  deleteBook,
  updateBook,
  getBookById,
  addToWishList,
  getUserWish,
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
router.get("/get-wish-list", verifyToken, getUserWish);
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
router.put("/add-to-wish-list/:id", verifyToken, addToWishList);
module.exports = router;
