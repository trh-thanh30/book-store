const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    contactByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
