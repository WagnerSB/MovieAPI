
const movieDAO = require("../dao/movieDAO");


async function findAll() {
    return await movieDAO.findAll();
}

async function findById(id) {
    return await movieDAO.findById(id);
}

async function create(dados) {
    try {
        const newMovie = {
            title: dados.title,
            genres: dados.genres,
        };

        return await movieDAO.create(newMovie);
    } catch (err) {
        throw err;
    }
}

async function update(id, dados) {
    return await movieDAO.update(id, dados);
}

async function deleteMovie(id) {
    const movie = await movieDAO.findById(id);

    if (!movie) {
        return null;
    }

    return movieDAO.deleteMovie(id);
}


module.exports = {
    findAll, findById, create, update, deleteMovie
};
