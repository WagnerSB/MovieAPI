
let movies = [
  { id: 1, title: "Toy Story (1995)", genres: ["Adventure", "Animation", "Children", "Comedy", "Fantasy"] },
  { id: 2, title: "Jumanji (1995)", genres: ["Adventure", "Children", "Fantasy"] },
  { id: 3, title: "Grumpier Old Men (1995)", genres: ["Comedy", "Romance"] },
];

let proximoId = 4;

// =============================================
// Operações de Acesso a Dados
// =============================================

function findAll() {
  return movies;
}

function findById(id) {
  return movies.find(function (movie) {
    return movie.id === id;
  });
}

function create(movie) {
  const newMovie = {
    id: proximoId,
    title: movie.title,
    genres: movie.genres,
  };

  proximoId = proximoId + 1;
  movies.push(newMovie);

  return newMovie;
}

function update(id, updatedData) {
  const index = movies.findIndex(function (movie) {
    return movie.id === id;
  });

  if (index === -1) {
    return null;
  }

  movies[index] = {
    id: id,
    title: updatedData.title,
    genres: updatedData.genres,
  };

  return movies[index];
}

function deleteMovie(id) {
  const index = movies.findIndex(function (movie) {
    return movie.id === id;
  });

  if (index === -1) {
    return null;
  }

  const deleted = movies.splice(index, 1);
  return deleted[0];
}


module.exports = {
  findAll, findById, create, update, deleteMovie
};
