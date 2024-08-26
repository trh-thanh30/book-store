const Book = require("../models/book.models");
const Category = require("../models/categorie.models");
const User = require("../models/user.models");

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
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      };
    }
    const count = await Book.countDocuments(query);
    const books = await Book.find(query)
      .skip(skip)
      .limit(limit)
      .populate("category");
    return res.status(200).json({
      message: "Books fetched successfully",
      data: {
        books: books,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          pageSize: limit,
        },
      },
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something went wrong", success: false });
  }
};
const updateBook = async (req, res) => {
  const { role } = req.user;
  if (role !== "admin")
    return res.status(404).json({ message: "Not found", success: false });
  const { id } = req.params;
  const { title, description, author, category } = req.body;
  try {
    const book = await Book.findById(id);
    if (!book)
      return res.status(404).json({ message: "Not found", success: false });
    let updateBook = { title, description, author, category };
    if (req.file) updateBook.image = req.file?.path;
    const data = await Book.findByIdAndUpdate(id, updateBook, {
      new: true,
    });
    return res.status(200).json({ message: "Book updated successfully", data });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book)
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    return res.status(200).json({ message: "Book fetched successfully", book });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
const addToWishList = async (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({ message: "Book not found", success: false });
  try {
    const book = await Book.findById(id);
    book.userWish = !book.userWish;
    const saveBook = await book.save();
    if (saveBook.userWish === true) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { bookWishList: saveBook._id },
      });
    } else {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { bookWishList: saveBook._id },
      });
    }
    return res.status(200).json({
      message: "Book updated successfully",
      data: saveBook,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
const getUserWish = async (req, res) => {
  const { id } = req.user; // Get the user ID from the authenticated user
  try {
    let { limit, page, search } = req.query;
    const skip = (page - 1) * limit;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      };
    }
    const count = await User.countDocuments(query);

    // Find the user by ID and populate the bookWishList with the Book documents
    const user = await User.findById(id)
      .populate("bookWishList")
      .skip(skip)
      .limit(limit);
    // If the user doesn't have any books in the wishlist, return an empty array
    const books = user.bookWishList || [];

    return res.status(200).json({
      message: "Books fetched successfully",
      data: {
        data: books,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: books.length,
          pageSize: limit,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
module.exports = {
  createBook,
  getAllBook,
  deleteBook,
  updateBook,
  getBookById,
  addToWishList,
  getUserWish,
};
