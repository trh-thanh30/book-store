const Book = require("../models/book.models");
const Category = require("../models/categorie.models");

const createCategory = async (req, res) => {
  const { role } = req.user;
  if (role !== "admin")
    return res.status(403).json({
      message: "Unauthorized to access this resource",
      success: false,
    });

  const { name } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ message: "Name is required", success: false });

  const categoryExists = await Category.findOne({ name });
  if (categoryExists)
    return res
      .status(400)
      .json({ message: "Category already exists", success: false });
  try {
    const newCategory = new Category({ name, createBy: req.user.id });
    await newCategory.save();
    return res
      .status(200)
      .json({ message: "Category created successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res
      .status(200)
      .json({ message: "Categories fetched successfully", categories });
  } catch (error) {
    return res.status(404).json({ message: error.message, success: false });
  }
};
const updateCategories = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  const { name } = req.body;
  if (!id)
    return res.status(404).json({ message: "Not found", success: false });
  if (role !== "admin")
    return res.status(404).json({ message: "Not found", success: false });
  try {
    // old categories
    const oldCategory = await Category.findById(id);
    if (!oldCategory)
      return res.status(404).json({ message: "Not found", success: false });
    // update categories
    const updateCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
      }
    );
    // update categroeis of books
    await Book.updateMany({ category: oldCategory.name }, { category: name });
    return res
      .status(200)
      .json({ message: "Category updated successfully", updateCategory });
  } catch (error) {
    return res.status(404).json({ message: error.message, success: false });
  }
};
const deleteCategories = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  if (role !== "admin")
    return res.status(404).json({ message: "Not found", success: false });
  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    if (!deleteCategory)
      return res.status(404).json({ message: "Not found", success: false });
    return res
      .status(200)
      .json({ message: "Category deleted successfully", deleteCategory });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  updateCategories,
  deleteCategories,
};
