
const userService = require("../services/userService");


async function findAll(req, res, next) {
    try {
        const users = await userService.findAll();
        if (users.length === 0)
            return res.status(204).json();
        return res.status(200).json(users);
    } catch (erro) {
        return next(erro);
    }
}

async function findById(req, res, next) {
    try {
        const id = parseInt(req.params.id);

        // Validar se é você mesmo ou adm
        if (id != req.user.id && req.user.role != 1) {
            return res.status(403).json({ message: "Sem permissão para ver outro usuário" })
        }

        const user = await userService.findById(id);

        if (user)
            return res.status(200).json(user);
        else
            return res.status(404).json({ message: `Usuário com id ${id} não encontrado` });
    } catch (erro) {
        return next(erro);
    }
}

async function create(req, res, next) {
    try {
        const dados = req.body;

        // Validar se é um admin criando outro admin
        if (dados.role && dados.role != 0) {
            if (!req.user || req.user.role != 1) {
                return res.status(403).json({ message: "Sem permissão para dar acesso superior" })
            }
        }

        if (!dados.name || !dados.email || !dados.password) {
            return res.status(400).json({
                message: "Os campos 'name', 'email' e 'password' são obrigatórios"
            });
        }
        const newUser = await userService.create(dados);

        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(err.status || 500).json({
            message: err.message || "Erro interno"
        });
    }
}

async function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;

        if (id != req.user.id && req.user.role != 1) {
            return res.status(403).json({ message: "Sem permissão para alterar outro usuário" })
        }

        // Validar se é um admin alterando outro admin
        if (dados.role && dados.role != 0) {
            if (req.user.role != 1) {
                return res.status(403).json({ message: "Sem permissão para dar acesso superior" })
            }
        }

        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        if (!dados.name && !dados.email && !dados.password && dados.role === undefined) {
            return res.status(400).json({
                message: "Informe ao menos um campo para atualizar"
            });
        }

        const updatedUser = await userService.update(id, dados);

        if (!updatedUser) {
            return res.status(404).json({
                message: `Usuário com id ${id} não encontrado`
            });
        }

        return res.status(200).json(updatedUser);

    } catch (err) {
        return res.status(err.status || 500).json({
            message: err.message || "Erro interno"
        });
    }
}

async function deleteUser(req, res, next) {
    try {
        const id = parseInt(req.params.id);

        // Validar se é você mesmo ou adm
        if (id != req.user.id && req.user.role != 1) {
            return res.status(403).json({ message: "Sem permissão para remover outro usuário" })
        }

        const user = await userService.deleteUser(id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        return res.status(200).json({ message: "Usuário removido com sucesso." });
    } catch (erro) {
        return next(erro);
    }
}


module.exports = {
    findAll, findById, create, update, deleteUser
};
