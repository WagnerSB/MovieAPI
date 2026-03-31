// docs/swagger/ratings.js
module.exports = {
    "/auth/login": {
        post: {
            summary: "Faz login do usuário",
            tags: ["Auth"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/LoginInput"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Login Realizado",
                    content: {
                        "application/json": {
                            example: {
                                "token": "jwt_token"
                            }
                        }
                    }
                },
                400: {
                    description: "Campos inválidos",
                    content: {
                        "application/json": {
                            example: {
                                "message": "Email e senha são obrigatórios"
                            }
                        }
                    }
                },
                401: {
                    description: "Não autenticado",
                    content: {
                        "application/json": {
                            example: {
                                "message": "Usuário ou senha inválidos"
                            }
                        }
                    }
                }
            }
        }
    },
    "/auth/signup": {
        post: {
            summary: "Registra um usuário",
            tags: ["Auth"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UserInput"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Usuário registrado",
                    content: {
                        "application/json": {
                            example: {
                                "token": "jwt_token"
                            }
                        }
                    }
                },
                400: {
                    description: "Campos inválidos",
                    content: {
                        "application/json": {
                            example: {
                                "message": "Os campos 'name', 'email' e 'password' são obrigatórios"
                            }
                        }
                    }
                },
                403: {
                    description: "Não autorizado",
                    content: {
                        "application/json": {
                            example: {
                                "message": "Sem permissão para criar usuário com role superior"
                            }
                        }
                    }
                },
                409: {
                    description: "Email duplicado",
                    content: {
                        "application/json": {
                            example: { "message": "Email já cadastrado" }
                        }
                    }
                }
            }
        }
    },
};