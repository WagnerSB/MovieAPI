
const userDAO = require("../dao/userDAO");
const bcrypt = require("bcrypt");


async function enryptPassword(password, saltRounds = 10) {
    return await bcrypt.hash(password, saltRounds);
}

async function findAll() {
    return await userDAO.findAll();
}

async function findById(id) {
    return await userDAO.findById(id);
}

async function create(dados) {
    try {
        const newUser = {
            ...dados,
            hashedPassword: await enryptPassword(dados.password),
            role: dados.role || 0,
        };

        return await userDAO.create(newUser);
    } catch (err) {
        throw err;
    }
}


async function update(id, dados) {
    try {
        const updateData = {};

        if (dados.name) updateData.name = dados.name;
        if (dados.email) updateData.email = dados.email;

        if (dados.password) {
            const hashed = await enryptPassword(dados.password);
            updateData.password = hashed;
        }

        if (dados.role !== undefined) {
            updateData.role = dados.role;
        }

        if (dados.role !== undefined) {
            updateData.role = dados.role;
        }

        return await userDAO.update(id, updateData);

    } catch (err) {
    throw err;
}
}

async function deleteUser(id) {
    return userDAO.deleteUser(id);
}


module.exports = {
    findAll, findById, create, update, deleteUser
};
