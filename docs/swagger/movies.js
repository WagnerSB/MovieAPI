// docs/swagger/ratings.js
module.exports = {
    "/movies": {
        get: {
            summary: "Lista todos os filmes",
            tags: ["Movies"],
            responses: {
                200: {
                    description: "Lista de filmes",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: { $ref: "#/components/schemas/Movie" }
                            }
                        }
                    }
                },
                204: {
                    description: "Sem filmes cadastrados",
                    content: {
                        "application/json": []
                    }
                }
            }
        },
        post: {
            summary: "Cria um filme",
            tags: ["Movies"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/MovieInput"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Filme criado",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Movie"
                            }
                        }
                    }
                },
                400: {
                    description: "Campos inválidos",
                    content: {
                        "application/json": {
                            example: {
                                "message": "Os campos 'title' e 'genres' são obrigatórios"
                            }
                        }
                    }
                },
                401: {
                    description: "Não autenticado",
                    content: {
                        "application/json": {
                            example: {
                                "message": "Token não informado"
                            }
                        }
                    }
                },
                403: {
                    description: "Não autorizado",
                    content: {
                        "application/json": {
                            example: {
                                "message": "Acesso restrito a administradores"
                            }
                        }
                    }
                }
            }
        }
    },
    "/movies/{id}": {
        get: {
            summary: "Busca um filme por ID",
            tags: ["Movies"],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: {
                200: {
                    description: "Filme encontrado",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Movie"
                            }
                        }
                    }
                },
                404: {
                    description: "Filme não encontrado",
                    content: {
                        "application/json": {
                            "example": { "message": "Filme com id 1 não encontrado" }
                        }
                    }
                }
            }
        },
        put: {
            summary: "Atualiza um filme",
            tags: ["Movies"],
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": { schema: { $ref: "#/components/schemas/MovieInput" } }
                }
            },
            responses: {
                200: {
                    description: "Filme atualizado",
                    content: {
                        "application/json": { schema: { $ref: "#/components/schemas/Movie" } }
                    }
                },
                400: {
                    description: "Campos inválidos",
                    content: {
                        "application/json": {
                            "example": { "message": "Os campos 'title' e 'genres' são obrigatórios" }
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
                404: {
                    description: "Filme não encontrado",
                    content: {
                        "application/json": {
                            "example": { "message": "Filme com id 1 não encontrado" }
                        }
                    }
                }
            }
        },
        delete: {
            summary: "Remove um filme",
            tags: ["Movies"],
            security: [{ "bearerAuth": [] }],
            parameters: [
                { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
            ],
            responses: {
                200: {
                    description: "Filme deletado",
                    content: {
                        "application/json": {
                            "example": { "message": "Filme removido com sucesso." }
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
                404: {
                    description: "Filme não encontrado",
                    content: {
                        "application/json": {
                            "example": { "message": "Filme não encontrado" }
                        }
                    }
                }
            }
        }
    }
};