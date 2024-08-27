const Contact = require("../models/contact.models");

const contact = async (req, res) => {
  const { username, email, phone, message } = req.body;
  if (!username)
    return res
      .status(400)
      .json({ message: "Username is required", success: false });
  if (!email)
    return res
      .status(400)
      .json({ message: "Email is required", success: false });
  if (!phone)
    return res
      .status(400)
      .json({ message: "Phone is required", success: false });
  if (!message)
    return res
      .status(400)
      .json({ message: "Message is required", success: false });
  try {
    const newContact = new Contact({
      username,
      email,
      phone,
      message,
      userId: req.user.id,
    });
    await newContact.save();
    return res.status(200).json({
      message: "Contact created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
const getContacts = async (req, res) => {
  const { role } = req.user;
  if (role !== "admin")
    return res.status(403).json({
      message: "Unauthorized to access this resource",
      success: false,
    });
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    let query = {};
    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { message: { $regex: search, $options: "i" } },
        ],
      };
    }
    const count = await Contact.countDocuments(query);
    const getContact = await Contact.find({}).skip(skip).limit(limit);
    return res.status(200).json({
      data: {
        contacts: getContact,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          pageSize: limit,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { contact, getContacts };
