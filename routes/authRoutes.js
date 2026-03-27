
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { authSignupMiddleware } = require("../middlewares/authMiddleware");

// Fazer login
router.post("/login", authController.login);
router.post("/signup", authSignupMiddleware, authController.signup);

module.exports = router;
