const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { contact, getContacts } = require("../controller/contact.controller");
const router = express.Router();

// POST
router.post('/user-contact', verifyToken, contact)

// GET
router.get("/get-contact", verifyToken, getContacts);
module.exports = router;
