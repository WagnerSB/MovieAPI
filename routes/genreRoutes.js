
const express = require("express");
const router = express.Router();

const genreController = require("../controllers/genreController");


// Cria um novo gênero
router.post("/", genreController.create);

// Lista todos os gêneros
router.get("/", genreController.findAll);

// Busca um gênero específico
router.get("/:id", genreController.findById);

// Atualiza um gênero existente
router.put("/:id", genreController.update);

// Remove um gênero
router.delete("/:id", genreController.deleteGenre);

module.exports = router;
