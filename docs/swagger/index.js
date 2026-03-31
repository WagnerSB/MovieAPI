// docs/swagger/index.js
const ratings = require("./ratings");
const genres = require("./genres");
const movies = require("./movies");
const users = require("./users");
const auth = require("./auth");
const components = require("./components");

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "API de Filmes",
    version: "1.0.0",
    description: "Documentação da movieAPI"
  },
  servers: [{ url: "http://localhost:3000" }],
  paths: {
    ...ratings,
    ...genres,
    ...movies,
    ...users,
    ...auth
  },
  components
};