
const movieDAO = require("../dao/movieDAO");


function findAll() {
    return movieDAO.findAll();
}

function findById(id) {
    return movieDAO.findById(id);
}

function create(dados) {
    const newMovie = {
        title: dados.title,
        genres: dados.genres,
    };

    return movieDAO.create(newMovie);
}

function update(id, dados) {
    const movie = movieDAO.findById(id);

    if (!movie) {
        return null;
    }

    const updatedData = {
        title: dados.title || movie.title,
        genres: dados.genres || movie.genres
    };

    return movieDAO.update(id, updatedData);
}

function deleteMovie(id) {
    const movie = movieDAO.findById(id);

    if (!movie) {
        return null;
    }

    return movieDAO.deleteMovie(id);
}


module.exports = {
    findAll, findById, create, update, deleteMovie
};
