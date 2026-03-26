// routes/livroRoutes.js — Definição das rotas do recurso "Livros"

const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");


// Cria um novo filme
router.post("/", movieController.create);

// Lista todos os filmes
router.get("/", movieController.findAll);

// Busca um filme específico
router.get("/:id", movieController.findById);

// Atualiza um filme existente
router.put("/:id", movieController.update);

// Remove um filme
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
