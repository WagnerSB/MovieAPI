
const movieService = require("../services/movieService");


async function findAll(req, res, next) {
    try {
        const movies = await movieService.findAll();
        if (movies.length === 0)
            return res.status(204).json();
        return res.status(200).json(movies);
    } catch (erro) {
        return next(erro);
    }
}

async function findById(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const movie = await movieService.findById(id);

        if (movie)
            return res.status(200).json(movie);
        else
            return res.status(404).json({ message: `Filme com id ${id} não encontrado` });
    } catch (erro) {
        return next(erro);
    }
}

async function create(req, res, next) {
    try {
        const dados = req.body;

        if (!dados.title || !dados.genres) {
            return res.status(400).json({
                message: "Os campos 'title' e 'genres' são obrigatórios"
            });
        }

        // Valida se é array
        if (!Array.isArray(dados.genres)) {
            return res.status(400).json({
                message: "'genres' deve ser um array"
            });
        }

        // Valida pelo menos 1 gênero
        if (dados.genres.length === 0) {
            return res.status(400).json({
                message: "Informe ao menos um gênero"
            });
        }

        // Todos os ids devem ser inteiros
        const allIntegers = dados.genres.every(
            (g) => typeof g === "number" && Number.isInteger(g)
        );

        if (!allIntegers) {
            return res.status(400).json({
                message: "Todos os IDs de gêneros devem ser inteiros"
            });
        }

        const newMovie = await movieService.create(dados);

        return res.status(201).json(newMovie);
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

    if (!dados.title || !dados.genres) {
      return res.status(400).json({
        message: "Os campos 'title' e 'genres' são obrigatórios"
      });
    }

    // Validação de gêneros
    if (!Array.isArray(dados.genres)) {
      return res.status(400).json({
        message: "'genres' deve ser um array"
      });
    }

    if (dados.genres.length === 0) {
      return res.status(400).json({
        message: "Informe ao menos um gênero"
      });
    }

    const allIntegers = dados.genres.every(
      (g) => typeof g === "number" && Number.isInteger(g)
    );

    if (!allIntegers) {
      return res.status(400).json({
        message: "Todos os IDs de gêneros devem ser inteiros"
      });
    }

    const updatedMovie = await movieService.update(id, dados);

    if (!updatedMovie) {
      return res.status(404).json({
        message: `Filme com id ${id} não encontrado`
      });
    }

    return res.status(200).json(updatedMovie);

  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message || "Erro interno"
    });
  }
}

async function deleteMovie(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const movie = await movieService.deleteMovie(id);

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
