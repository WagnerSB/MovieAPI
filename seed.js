const db = require('./models');
const bcrypt = require('bcrypt');

async function seed() {
    await db.sequelize.sync({ force: true }); // Apaga dados antigos

    // --- Cria usuários ---
    const passwordHash = await bcrypt.hash('admin', 10);

    const adminUser = await db.User.create({
        name: 'Admin',
        email: 'admin@admin.com',
        password: passwordHash,
        role: 1
    });

    const normalUser = await db.User.create({
        name: 'Airton Senna',
        email: 'airtons@gmail.com',
        password: await bcrypt.hash('123456', 10),
        role: 0
    });

    // --- Cria gêneros ---
    const genre1 = await db.Genre.create({ name: 'Animação' });
    const genre2 = await db.Genre.create({ name: 'Ação' });
    const genre3 = await db.Genre.create({ name: 'Comédia' });

    // --- Cria filmes ---
    const movie1 = await db.Movie.create({
        title: 'Toy Story (1995)'
    });
    await movie1.setGenres([genre1.id, genre2.id, genre3.id]);

    const movie2 = await db.Movie.create({
        title: 'Jumanji'
    });
    await movie2.setGenres([genre2.id, genre3.id]);

    // --- Cria rating do admin ---
    await db.Rating.create({
        rating: 5,
        comment: 'Ótimo filme!',
        userId: normalUser.id,
        movieId: movie1.id
    });

    console.log('Seed finalizado com sucesso!');
    process.exit();
}

seed().catch(err => {
    console.error('Erro ao popular banco:', err);
});