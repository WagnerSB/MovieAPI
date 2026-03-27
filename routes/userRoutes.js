
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { authMiddleware, adminMiddleware, authSignupMiddleware } = require("../middlewares/authMiddleware");


// Cria um novo usuário
router.post("/", authSignupMiddleware, userController.create);

// Lista todos os usuários
router.get("/", authMiddleware, adminMiddleware, userController.findAll);

// Busca um usuário específico
router.get("/:id", authMiddleware, userController.findById);

// Atualiza um usuário existente
router.put("/:id", authMiddleware, userController.update);

// Remove um usuário
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
