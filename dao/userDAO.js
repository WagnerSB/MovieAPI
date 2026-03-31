
const { User } = require("../models")

async function findAll() {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    console.log(err)
    return null
  }
}

async function findById(id) {
  try {
    const user = await User.findOne({
      where: { id: id }
    });

    return user;
  } catch (err) {
    console.log(err)
    return null
  }
}

async function create(user) {
  try {
    const existingUser = await User.findOne({ where: { email: user.email } })
    if (existingUser) {
      const err = new Error('Email já está em uso');
      err.status = 400;
      throw err;
    }
    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: user.hashedPassword,
      role: user.role,
    })

    return newUser;
  } catch (err) {
    throw err;
  }
}

async function update(id, dados) {
  try {
    const [count, rows] = await User.update(dados, {
      where: { id },
      returning: true
    });

    if (!count) return null;

    return rows[0];

  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      const err = new Error('Email já está em uso');
      err.status = 400;
      throw err;
    }
    throw err;
  }
}

async function deleteUser(id) {
  try {
    const deletedUser = await User.destroy({ where: { id: id } });
    return deletedUser;
  } catch (err) {
    console.log(err)
    return null;
  }
}


module.exports = {
  findAll, findById, create, update, deleteUser
};
