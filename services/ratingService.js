
const ratingDAO = require("../dao/ratingDAO");
const movieDAO = require("../dao/movieDAO");


async function findAll() {
    return await ratingDAO.findAll();
}

async function findById(id) {
    return await ratingDAO.findById(id);
}

async function create(dados) {
    try {
        const movie = await movieDAO.findById(dados.movieId);

        if (!movie) {
            const err = new Error('Filme não encontrado');
            err.status = 404;
            throw err;
        }

        if (dados.rating < 0 || dados.rating > 5) {
            const err = new Error('A nota deve ser entre 0.0 e 5.0');
            err.status = 400;
            throw err;
        }

        const existingRating = await ratingDAO.findByMovieAndUser(dados.movieId, dados.userId);

        if (existingRating) {
            const err = new Error('Você já avaliou esse filme');
            err.status = 409;
            throw err;
        }

        const newRating = {
            rating: dados.rating,
            comment: dados.comment,
            movieId: dados.movieId,
            userId: dados.userId,
        };

        return await ratingDAO.create(newRating);
    } catch (err) {
        throw err;
    }
}

async function update(id, dados) {
    try {
        const ratingAtual = await ratingDAO.findById(id);

        if (!ratingAtual) {
            const err = new Error('Avaliação não encontrada');
            err.status = 404;
            throw err;
        }

        // Valida se é o dono da avaliação ou ADM
        if (ratingAtual.userId !== dados.user.id && dados.user.role !== 1) {
            const err = new Error('Você não tem permissão para alterar essa avaliação');
            err.status = 403;
            throw err;
        }

        // Impede alteração do filme
        if (dados.movieId && dados.movieId !== ratingAtual.movieId) {
            const err = new Error('Não é permitido alterar o filme');
            err.status = 403;
            throw err;
        }

        const dadosAtualizados = {
            rating: dados.rating ?? ratingAtual.rating,
            comment: dados.comment ?? ratingAtual.comment,
            userId: dados.userId
        };

        return await ratingDAO.update(id, dadosAtualizados);

    } catch (err) {
        throw err;
    }
}

async function deleteRating(id, user) {
    const rating = await ratingDAO.findById(id);

    if (!rating) {
        return null;
    }

    if (rating.userId !== user.id && user.role !== 1) {
        const err = new Error('Você não tem permissão para excluir essa avaliação');
        err.status = 403;
        throw err;
    }

    return ratingDAO.deleteRating(id);
}


module.exports = {
    findAll, findById, create, update, deleteRating
};
