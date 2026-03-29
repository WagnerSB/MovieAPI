const { Rating } = require("../models")

async function findAll() {
  try {
    const ratings = await Rating.findAll();
    return ratings;
  } catch (err) {
    console.log(err)
    return null
  }
}

async function findById(id) {
  try {
    const rating = await Rating.findOne({
      where: { id: id }
    });

    return rating;
  } catch (err) {
    console.log(err)
    return null
  }
}

async function create(rating) {
  try {
    return await Rating.create({ ...rating })
  } catch (err) {
    throw err;
  }
}

async function update(id, rating) {
  try {

    const [count, rows] = await Rating.update(
      { ...rating },
      {
        where: { id: id },
        returning: true
      }
    );

    if (!count) return null;

    return rows[0];

  } catch (err) {
    throw err;
  }
}

async function deleteRating(id) {
  try {
    const deletedRating = await Rating.destroy({
      where: { id: id }
    });
    return deletedRating;
  } catch (err) {
    console.log(err)
    return null;
  }
}

async function findByMovieAndUser(movieId, userId) {
  try {
    const rating = await Rating.findOne({
      where: { movieId: movieId, userId: userId }
    });

    return rating;
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports = {
  findAll, findById, create, update, deleteRating, findByMovieAndUser
};
