const express = require('express');
const app = express();
const PORT = 3000;

const db = require('./models');

app.use(express.json());

const movieRoutes = require("./routes/movieRoutes");


app.use("/movies", movieRoutes);


const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// Iniciar servidor
db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
