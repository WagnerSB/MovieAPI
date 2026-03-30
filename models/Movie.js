
module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define("Movie", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            validade: {
                notEmpty: true
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validade: {
                notEmpty: true
            }
        }

    }, {
        tableName: 'movies',
        timestamps: false
    });

    Movie.associate = (models) => {
        // Relação com os gêneros de filme
        Movie.belongsToMany(models.Genre, {
            through: models.MovieGenre,
            foreignKey: 'movieId',
            otherKey: 'genreId',
            as: 'genres'
        });

        // Relação com os usuários (rating)
        Movie.belongsToMany(models.User, {
            through: models.Rating,
            foreignKey: 'movieId',
            otherKey: 'userId'
        });
    };

    return Movie;
}