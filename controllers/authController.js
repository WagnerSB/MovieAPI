
const authService = require("../services/authService");


async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email e senha são obrigatórios"
            });
        }

        const result = await authService.login(email, password);

        return res.status(200).json(result);

    } catch (err) {
        return res.status(err.status || 500).json({
            message: err.message || "Erro interno"
        });
    }
}

async function signup(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Os campos 'name', 'email' e 'password' são obrigatórios",
      });
    }

    // Verifica a role
    let finalRole = 0;

    if (role && role != 0) {
      // Se tentar criar role != 0, precisa ser admin logado
      if (!req.user || req.user.role !== 1) {
        return res.status(403).json({
          message: "Sem permissão para criar usuário com role superior",
        });
      }
      finalRole = role;
    }

    const newUser = await authService.signup({ name, email, password, role: finalRole });

    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message || "Erro interno",
    });
  }
}

module.exports = { login, signup }