

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
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
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // 0: user, 1: admin
            validate: {
                isIn: [[0, 1]] // só permite 0 ou 1
            }
        }
    }, {
        tableName: 'users',
        timestamps: true,
        defaultScope: {
            attributes: { exclude: ["password"] } // Não mostrar a senha por padrão
        }

    });

    User.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    return User;
}