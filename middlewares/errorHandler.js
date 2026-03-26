
function errorHandler(err, req, res, next) {
  console.error(" --- Erro no Servidor ---")
  console.error("Rota:", req.method, req.originalUrl);
  console.error("Mensagem:", err.message);
  console.error("Stack:", err.stack);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message || "Erro interno do servidor",
  });
}

module.exports = errorHandler;
