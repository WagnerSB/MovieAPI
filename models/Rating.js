
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define("Rating", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movies',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A nota não pode estar vazia."
        },
        min: {
          args: [0],
          msg: "A nota mínima permitida é 0.0."
        },
        max: {
          args: [5],
          msg: "A nota máxima permitida é 5.0."
        },
        isDecimal: {
          msg: "A nota deve ser um número decimal (ex: 4.5)."
        }
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    tableName: 'ratings',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'movieId'] // garante 1 avaliação de usuário por filme
      }
    ]

  });

  return Rating;
};