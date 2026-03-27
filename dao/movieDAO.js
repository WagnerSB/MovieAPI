const { Movie, Genre } = require("../models")

let moviesOld = [
  { id: 1, title: "Toy Story (1995)", genres: ["Adventure", "Animation", "Children", "Comedy", "Fantasy"] },
  { id: 2, title: "Jumanji (1995)", genres: ["Adventure", "Children", "Fantasy"] },
  { id: 3, title: "Grumpier Old Men (1995)", genres: ["Comedy", "Romance"] },
];

async function findAll() {
  try {
    const movies = await Movie.findAll({
      include: {
        model: Genre,
        through: { attributes: [] }
      }
    });
    return movies;
  } catch (err) {
    console.log(err)
    return null
  }
}

async function findById(id) {
  try {
    const movie = await Movie.findOne({
      where: { id: id },
      include: {
        model: Genre,
        through: { attributes: [] }
      }
    });

    return movie;
  } catch (err) {
    console.log(err)
    return null
  }
}

async function create(movie) {
  try {
    const genresFound = await Genre.findAll({
      where: { id: movie.genres }
    });

    if (genresFound.length !== movie.genres.length) {
      const error = new Error("Um ou mais gêneros não existem");
      error.status = 400;
      throw error;
    }

    const newMovie = await Movie.create({
      title: movie.title
    })
    await newMovie.setGenres(movie.genres);

    // Versão com os gêneros
    await newMovie.reload({
      include: {
        model: Genre,
        through: { attributes: [] }
      }
    });

    return newMovie;
  } catch (err) {
    throw err;
  }
}

async function update(id, dados) {
  try {
    const movie = await Movie.findByPk(id);

    if (!movie) return null;

    const genresFound = await Genre.findAll({
      where: { id: dados.genres }
    });

    if (genresFound.length !== dados.genres.length) {
      const error = new Error("Um ou mais gêneros não existem");
      error.status = 400;
      throw error;
    }

    movie.title = dados.title;
    await movie.save();
    await movie.setGenres(dados.genres);

    await movie.reload({
      include: {
        model: Genre,
        through: { attributes: [] }
      }
    });

    return movie;

  } catch (err) {
    throw err;
  }
}

async function deleteMovie(id) {
  try {
    const deletedMovie = await Movie.destroy({ where: { id: id } });
    return deletedMovie;
  } catch (err) {
    console.log(err)
    return null;
  }
}


module.exports = {
  findAll, findById, create, update, deleteMovie
};
