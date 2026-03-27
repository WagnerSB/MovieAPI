
module.exports = (sequelize, DataTypes) => {
  const MovieGenre = sequelize.define("MovieGenre", {
    movieId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'movies',
        key: 'id'
      }
    },
    genreId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'genres',
        key: 'id'
      }
    }
  }, {
    tableName: 'movie_genres',
    timestamps: false
  });

  return MovieGenre;
};