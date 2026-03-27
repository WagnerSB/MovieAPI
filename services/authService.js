
require('dotenv').config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function login(email, password) {
    const user = await User.findOne({
        where: { email },
        attributes: { include: ["password"] }
    });

    if (!user) {
        const error = new Error("Usuário ou senha inválidos");
        error.status = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = new Error("Usuário ou senha inválidos");
        error.status = 401;
        throw error;
    }

    // Gera o token
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return {
        token
    };
}

async function signup({ name, email, password, role }) {
  // Checa se já existe
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error("Email já cadastrado");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria usuário
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 0,
  });

  // Não retornar a senha
  newUser.password = undefined;

  return newUser;
}



module.exports = { login, signup }