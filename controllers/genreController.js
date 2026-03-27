
const genreService = require("../services/genreService");


async function findAll(req, res, next) {
    try {
        const genres = await genreService.findAll();
        return res.status(200).json(genres);
    } catch (erro) {
        return next(erro);
    }
}

async function findById(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const genre = await genreService.findById(id);

        if (genre)
            return res.status(200).json(genre);
        else
            return res.status(404).json({ message: `Gênero com id ${id} não encontrado` });
    } catch (erro) {
        return next(erro);
    }
}

async function create(req, res, next) {
    try {
        const dados = req.body;

        if (!dados.name) {
            return res.status(400).json({
                message: "O campo 'name' é obrigatório"
            });
        }
        const newGenre = await genreService.create(dados);

        return res.status(201).json(newGenre);
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

    if (!dados.name) {
      return res.status(400).json({
        message: "O campo 'name' é obrigatório"
      });
    }

    const updatedGenre = await genreService.update(id, dados);

    if (!updatedGenre) {
      return res.status(404).json({
        message: `Gênero com id ${id} não encontrado`
      });
    }

    return res.status(200).json(updatedGenre);

  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message || "Erro interno"
    });
  }
}

async function deleteGenre(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const genre = await genreService.deleteGenre(id);

        if (!genre) {
            return res.status(404).json({ message: "Gênero não encontrado" });
        }

        return res.status(200).json({ message: "Gênero removido com sucesso." });
    } catch (erro) {
        return next(erro);
    }
}


module.exports = {
    findAll, findById, create, update, deleteGenre
};
