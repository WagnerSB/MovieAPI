
const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");

const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");


// Cria um novo filme
router.post("/", authMiddleware, adminMiddleware, movieController.create);

// Lista todos os filmes
router.get("/", movieController.findAll);

// Busca um filme específico
router.get("/:id", movieController.findById);

// Atualiza um filme existente
router.put("/:id", authMiddleware, adminMiddleware, movieController.update);

// Remove um filme
router.delete("/:id", authMiddleware, adminMiddleware, movieController.deleteMovie);

module.exports = router;
