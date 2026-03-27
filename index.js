const express = require('express');
const app = express();
const PORT = 3000;

const db = require('./models');

app.use(express.json());

const movieRoutes = require("./routes/movieRoutes");
const genreRoutes = require("./routes/genreRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");


app.use("/movies", movieRoutes);
app.use("/genres", genreRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);


const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// Iniciar servidor
db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
