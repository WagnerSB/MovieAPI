
module.exports = {
    "/genres": {
        get: {
            summary: "Lista todos os gêneros",
            tags: ["Genres"],
            responses: {
                200: {
                    description: "Lista de gêneros",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: { $ref: "#/components/schemas/Genre" }
                            }
                        }
                    }
                },
                204: {
                    description: "Sem gêneros cadastrados",
                    content: {
                        "application/json": []
                    }
                }
            }
        },
        post: {
            summary: "Cria um gênero",
            tags: ["Genres"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/GenreInput"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Gênero criado",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Genre"
                            }
                        }
                    }
                },
                400: {
                    description: "Campos inválidos",
                    content: {
                        "application/json": {
                            example: {
                                "message": "O campo 'name' é obrigatório"
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
    "/genres/{id}": {
        get: {
            summary: "Busca um gênero por ID",
            tags: ["Genres"],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: {
                200: {
                    description: "Gênero encontrado",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Genre"
                            }
                        }
                    }
                },
                404: {
                    description: "Gênero não encontrado",
                    content: {
                        "application/json": {
                            "example": { "message": "Gênero com id 1 não encontrado" }
                        }
                    }
                }
            }
        },
        put: {
            summary: "Atualiza um Gênero",
            tags: ["Genres"],
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": { schema: { $ref: "#/components/schemas/GenreInput" } }
                }
            },
            responses: {
                200: {
                    description: "Gênero atualizado",
                    content: {
                        "application/json": { schema: { $ref: "#/components/schemas/Genre" } }
                    }
                },
                400: {
                    description: "Campos inválidos",
                    content: {
                        "application/json": {
                            "example": { "message": "O campo 'name' é obrigatório" }
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
                    description: "Gênero não encontrado",
                    content: {
                        "application/json": {
                            "example": { "message": "Gênero com id 1 não encontrado" }
                        }
                    }
                }
            }
        },
        delete: {
            summary: "Remove um gênero",
            tags: ["Genres"],
            security: [{ "bearerAuth": [] }],
            parameters: [
                { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
            ],
            responses: {
                200: {
                    description: "Gênero deletado",
                    content: {
                        "application/json": {
                            "example": { "message": "Gênero removido com sucesso." }
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
                    description: "Gênero não encontrado",
                    content: {
                        "application/json": {
                            "example": { "message": "Gênero não encontrado" }
                        }
                    }
                }
            }
        }
    }
};