
const genreDAO = require("../dao/genreDAO");


async function findAll() {
    return await genreDAO.findAll();
}

async function findById(id) {
    return await genreDAO.findById(id);
}

async function create(dados) {
    try {
        const newGenre = {
            name: dados.name
        };

        return await genreDAO.create(newGenre);
    } catch (err) {
        throw err;
    }
}

async function update(id, dados) {
    return await genreDAO.update(id, dados);
}

async function deleteGenre(id) {
    const genre = await genreDAO.findById(id);

    if (!genre) {
        return null;
    }

    return genreDAO.deleteGenre(id);
}


module.exports = {
    findAll, findById, create, update, deleteGenre
};
