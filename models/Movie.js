
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
        Movie.belongsToMany(models.Genre, {
            through: models.MovieGenre,
            foreignKey: 'movieId',
            otherKey: 'genreId'
        });
    };

    return Movie;
}