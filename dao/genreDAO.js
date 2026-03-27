const { Genre } = require("../models")

async function findAll() {
  try {
    const genres = await Genre.findAll();
    return genres;
  } catch (err) {
    console.log(err)
    return null
  }
}

async function findById(id) {
  try {
    const genre = await Genre.findOne({
      where: { id: id }
    });

    return genre;
  } catch (err) {
    console.log(err)
    return null
  }
}

async function create(genre) {
  try {
    const newGenre = await Genre.create({
      name: genre.name
    })

    return newGenre;
  } catch (err) {
    throw err;
  }
}

async function update(id, dados) {
  try {
    
    const [count, rows] = await Genre.update(
      { name: dados.name },
      {
        where: { id },
        returning: true
      }
    );

    if (!count) return null;

    return rows[0];

  } catch (err) {
    throw err;
  }
}

async function deleteGenre(id) {
  try {
    const deletedGenre = await Genre.destroy({ where: { id: id } });
    return deletedGenre;
  } catch (err) {
    console.log(err)
    return null;
  }
}


module.exports = {
  findAll, findById, create, update, deleteGenre
};
