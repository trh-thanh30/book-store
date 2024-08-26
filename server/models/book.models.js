const mongoose = require("mongoose");
const bookImageDefalut =
  "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724025600&semt=ais_hybrid";
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        default: bookImageDefalut,
      },
    ],
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    createBy: {
      type: String,
      require: true,
    },
    userWish: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
