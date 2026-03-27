

module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define("Genre", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            validade: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validade: {
                notEmpty: true
            }
        }

    }, {
        tableName: 'genres',
        timestamps: false
    });

    Genre.associate = (models) => {
        Genre.belongsToMany(models.Movie, {
            through: models.MovieGenre,
            foreignKey: 'genreId',
            otherKey: 'movieId'
        });
    };

    return Genre;
}