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
  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    return res
      .status(200)
      .json({ message: "Category created successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
module.exports = { createCategory };
