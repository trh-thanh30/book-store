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
module.exports = { createCategory, getAllCategory };
