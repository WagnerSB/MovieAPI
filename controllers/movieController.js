
const movieService = require("../services/movieService");


function findAll(req, res, next) {
    try {
        const movies = movieService.findAll();
        return res.status(200).json(movies);
    } catch (erro) {
        return next(erro);
    }
}

function findById(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const movie = movieService.findById(id);

        if (movie)
            return res.status(200).json(movie);
        else
            return res.status(404).json({ message: `Filme com id ${id} não encontrado` });
    } catch (erro) {
        return next(erro);
    }
}

function create(req, res, next) {
    try {
        const dados = req.body;

        if (!dados.title || !dados.genres) {
            return res.status(400).json({ message: "Os campos 'title' e 'genres' são obrigatórios" });
        }

        const newMovie = movieService.create(dados);

        return res.status(201).json(newMovie);
    } catch (erro) {
        return next(erro);
    }
}

function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;

        const updatedMovie = movieService.update(id, dados);

        if (!updatedMovie) {
            return res.status(404).json({ message: `Filme com id ${id} não encontrado` });
        }

        return res.status(200).json(updatedMovie);
    } catch (erro) {
        return next(erro);
    }
}

function deleteMovie(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const movie = movieService.deleteMovie(id);

        if (!movie) {
            return res.status(404).json({ message: "Filme não encontrado" });
        }

        return res.status(200).json({ message: "Filme removido com sucesso." });
    } catch (erro) {
        return next(erro);
    }
}


module.exports = {
    findAll, findById, create, update, deleteMovie
};
