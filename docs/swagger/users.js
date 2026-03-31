// docs/swagger/ratings.js
module.exports = {
    "/users": {
        get: {
            summary: "Lista todos os usuários",
            tags: ["Users"],
            responses: {
                200: {
                    description: "Lista de usuários",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: { $ref: "#/components/schemas/User" }
                            }
                        }
                    }
                },
                401: {
                    description: "Não autenticado",
                    content: {
                        "application/json": {
                            "example": { "message": "Token não informado" }
                        }
                    }
                },
                403: {
                    description: "Não autorizado",
                    content: {
                        "application/json": {
                            "example": { "message": "Acesso restrito a administradores" }
                        }
                    }
                },
            }
        },
        post: {
            summary: "Cria um usuário",
            tags: ["Users"],
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
                201: {
                    description: "Usuário criado",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
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
                                "message": "Sem permissão para dar acesso superior"
                            }
                        }
                    }
                }
            }
        }
    },
    "/users/{id}": {
        get: {
            summary: "Busca um usuário por ID",
            tags: ["Users"],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: {
                200: {
                    description: "Usuário encontrado",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
                            }
                        }
                    }
                },
                403: {
                    description: "Não autorizado",
                    content: {
                        "application/json": {
                            example: {
                                "message": "Sem permissão para ver outro usuário"
                            }
                        }
                    }
                },
                404: {
                    description: "Usuário não encontrado",
                    content: {
                        "application/json": {
                            "example": { "message": "Usuário com id 1 não encontrado" }
                        }
                    }
                }
            }
        },
        put: {
            summary: "Atualiza um usuário",
            tags: ["Users"],
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": { schema: { $ref: "#/components/schemas/UserUpdate" } }
                }
            },
            responses: {
                200: {
                    description: "Usuário atualizado",
                    content: {
                        "application/json": { schema: { $ref: "#/components/schemas/User" } }
                    }
                },
                400: {
                    description: "Campos inválidos",
                    content: {
                        "application/json": {
                            "example": { "message": "Informe ao menos um campo para atualizar" }
                        }
                    }
                },
                401: {
                    description: "Não autenticado",
                    content: {
                        "application/json": {
                            "example": { "message": "Token não informado" }
                        }
                    }
                },
                403: {
                    description: "Não autorizado",
                    content: {
                        "application/json": {
                            "example": { "message": "Sem permissão para dar acesso superior" }
                        }
                    }
                },
                404: {
                    description: "Usuário não encontrado",
                    content: {
                        "application/json": {
                            "example": { "message": "Usuário com id 1 não encontrado" }
                        }
                    }
                }
            }
        },
        delete: {
            summary: "Remove um usuário",
            tags: ["Users"],
            security: [{ "bearerAuth": [] }],
            parameters: [
                { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
            ],
            responses: {
                200: {
                    description: "Usuário deletado",
                    content: {
                        "application/json": {
                            "example": { "message": "Usuário removido com sucesso." }
                        }
                    }
                },
                401: {
                    description: "Não autenticado",
                    content: {
                        "application/json": {
                            "example": { "message": "Token não informado" }
                        }
                    }
                },
                403: {
                    description: "Não autorizado",
                    content: {
                        "application/json": {
                            "example": { "message": "Sem permissão para remover outro usuário" }
                        }
                    }
                },
                404: {
                    description: "Usuário não encontrado",
                    content: {
                        "application/json": {
                            "example": { "message": "Usuário não encontrado" }
                        }
                    }
                }
            }
        }
    }
};