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
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { contact };
