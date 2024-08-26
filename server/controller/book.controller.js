const Book = require("../models/book.models");
const Category = require("../models/categorie.models");

const createBook = async (req, res) => {
  const { role } = req.user;
  const defaultImage =
    "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724025600&semt=ais_hybrid";
  const { title, description, author, category } = req.body;
  if (role !== "admin")
    return res.status(403).json({
      message: "Unauthorized to access this resource",
      success: false,
    });
  if (!title)
    return res
      .status(400)
      .json({ message: "Title is required", success: false });
  if (!description)
    return res
      .status(403)
      .json({ message: "Description is required", success: false });
  if (!author)
    return res
      .status(403)
      .json({ message: "Author is required", success: false });
  if (!category)
    return res
      .status(403)
      .json({ message: "Category is required", success: false });
  const hasTitle = await Book.findOne({ title });
  if (hasTitle)
    return res
      .status(400)
      .json({ message: "Title already exists", success: false });
  const uploadImage = (req.body.image = req.file
    ? req.file?.path
    : defaultImage);
  try {
    const categoryDoc = await Category.findOne({ name: category });
    console.log(categoryDoc);
    if (!categoryDoc)
      return res
        .status(400)
        .json({ message: "Category not found", success: false });
    const newBook = new Book({
      title,
      description,
      image: uploadImage,
      author,
      category: categoryDoc.name,
      createBy: req.user.id,
    });
    await newBook.save();
    return res
      .status(200)
      .json({ message: "Book created successfully", success: true, newBook });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};
const deleteBook = async (req, res) => {
  const { role } = req.user;
  if (role !== "admin")
    return res.status(403).json({
      message: "Unauthorized to access this resource",
      success: false,
    });
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book)
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    await Book.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Book deleted successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
const getAllBook = async (req, res) => {
  try {
    const books = await Book.find();
    return res
      .status(200)
      .json({ message: "Books fetched successfully", books });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something went wrong", success: false });
  }
};
module.exports = { createBook, getAllBook };
