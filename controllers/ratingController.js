
const ratingService = require("../services/ratingService");


async function findAll(req, res, next) {
    try {
        const ratings = await ratingService.findAll();
        if (ratings.length === 0)
            return res.status(204).json();
        return res.status(200).json(ratings);
    } catch (erro) {
        return next(erro);
    }
}

async function findById(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const rating = await ratingService.findById(id);

        if (rating)
            return res.status(200).json(rating);
        else
            return res.status(404).json({ message: `Avaliação com id ${id} não encontrada` });
    } catch (erro) {
        return next(erro);
    }
}

async function create(req, res, next) {
    try {
        const dados = req.body;
        dados.userId = req.user.id;

        if (!dados.rating || !dados.movieId) {
            return res.status(400).json({
                message: "Os campos 'rating' e 'movieId' são obrigatórios"
            });
        }
        const newRating = await ratingService.create(dados);

        return res.status(201).json(newRating);
    } catch (err) {
        return res.status(err.status || 500).json({
            message: err.message || "Erro interno"
        });
    }
}

async function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;
        dados.user = req.user;

        if (!dados.rating && !dados.comment) {
            return res.status(400).json({
                message: "Um comentário ou avaliação deve ser inserido"
            });
        }

        const updatedRating = await ratingService.update(id, dados);

        if (!updatedRating) {
            return res.status(404).json({
                message: `Avaliação com id ${id} não encontrada`
            });
        }

        return res.status(200).json(updatedRating);

    } catch (err) {
        return res.status(err.status || 500).json({
            message: err.message || "Erro interno"
        });
    }
}

async function deleteRating(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const rating = await ratingService.deleteRating(id, req.user);

        if (!rating) {
            return res.status(404).json({ message: "Avaliação não encontrada" });
        }

        return res.status(200).json({ message: "Avaliação removida com sucesso." });
    } catch (err) {
        return res.status(err.status || 500).json({
            message: err.message || "Erro interno"
        });
    }
}


module.exports = {
    findAll, findById, create, update, deleteRating
};
