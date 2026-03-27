require('dotenv').config();
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Token não informado" });

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

function authSignupMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();

  const [, token] = authHeader.split(" ");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
  }
  next();
}

function adminMiddleware(req, res, next) {
    console.log(req.user)
  if (req.user && req.user.role == 1) {
    return next();
  }

  // Se não for admin
  return res.status(403).json({ message: "Acesso restrito a administradores" });
}


module.exports =  {authMiddleware, authSignupMiddleware, adminMiddleware};