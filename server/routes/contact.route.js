const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { contact } = require("../controller/contact.controller");
const router = express.Router();

// POST
router.post('/contact', verifyToken, contact)
module.exports = router;
