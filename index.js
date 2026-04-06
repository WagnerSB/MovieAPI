const express = require('express');
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;
const { User } = require("./models")

const db = require('./models');

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger/index.js");


app.use(express.json());

const movieRoutes = require("./routes/movieRoutes");
const genreRoutes = require("./routes/genreRoutes");
const userRoutes = require("./routes/userRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const authRoutes = require("./routes/authRoutes");


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/movies", movieRoutes);
app.use("/genres", genreRoutes);
app.use("/users", userRoutes);
app.use("/ratings", ratingRoutes);
app.use("/auth", authRoutes);


const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// Iniciar servidor
db.sequelize.sync().then(async () => {
    // Verifica se já existe algum admin
    const adminExists = await User.findOne({ where: { role: 1 } });

    if (!adminExists) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash("admin", salt);
        await User.create({
            name: "admin",
            email: "admin@admin.com",
            password: password,
            role: 1
        });
        console.log("Usuário admin criado: admin@admin.com / admin");
    }

    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});
