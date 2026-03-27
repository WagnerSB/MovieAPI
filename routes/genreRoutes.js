
const express = require("express");
const router = express.Router();

const genreController = require("../controllers/genreController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");


// Cria um novo gênero
router.post("/", authMiddleware, adminMiddleware, genreController.create);

// Lista todos os gêneros
router.get("/", genreController.findAll);

// Busca um gênero específico
router.get("/:id", genreController.findById);

// Atualiza um gênero existente
router.put("/:id", authMiddleware, adminMiddleware, genreController.update);

// Remove um gênero
router.delete("/:id", authMiddleware, adminMiddleware, genreController.deleteGenre);

module.exports = router;
