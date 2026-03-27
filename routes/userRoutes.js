
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");


// Cria um novo usuário
router.post("/", userController.create);

// Lista todos os usuários
router.get("/", userController.findAll);

// Busca um usuário específico
router.get("/:id", userController.findById);

// Atualiza um usuário existente
router.put("/:id", userController.update);

// Remove um usuário
router.delete("/:id", userController.deleteUser);

module.exports = router;
