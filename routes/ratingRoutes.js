
const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/ratingController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");


// Cria uma nova avaliação
router.post("/", authMiddleware , ratingController.create);

// Lista todas as avaliações
router.get("/", ratingController.findAll);

// Busca uma avaliação específica
router.get("/:id", ratingController.findById);

// Atualiza uma avaliação existente
router.put("/:id", authMiddleware, ratingController.update);

// Remove uma avaliação
router.delete("/:id", authMiddleware, ratingController.deleteRating);

module.exports = router;
