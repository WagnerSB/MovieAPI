
module.exports = {
    "/ratings": {
        get: {
            summary: "Lista todas as avaliações",
            tags: ["Ratings"],
            responses: {
                200: {
                    description: "Lista de avaliações",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: { $ref: "#/components/schemas/Rating" }
                            }
                        }
                    }
                },
                204: {
                    description: "Sem avaliações cadastradas",
                    content: {
                        "application/json": []
                    }
                }
            }
        },
        post: {
            summary: "Cria uma avaliação",
            tags: ["Ratings"],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    "application/json": { schema: { $ref: "#/components/schemas/RatingInput" } }
                }
            },
            responses: {
                201: {
                    description: "Avaliação criada",
                    content: {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "rating": "3.5",
                                "comment": "Um bom filme",
                                "movieId": 1,
                                "userId": 1,
                                "updatedAt": "2026-03-30T01:09:51.250Z",
                                "createdAt": "2026-03-30T01:09:51.250Z"
                            }
                        }
                    }
                },
                400: {
                    description: "Campos inválidos",
                    content: {
                        "application/json": {
                            "example": {
                                "message": "Os campos 'name', 'email' e 'password' são obrigatórios"
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
                409: {
                    description: "Avaliação duplicada",
                    content: {
                        "application/json": {
                            "example": { "message": "Você já avaliou esse filme" }
                        }
                    }
                }
            }
        }
    },
    "/ratings/{id}": {
        get: {
            summary: "Busca avaliação por ID",
            tags: ["Ratings"],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            responses: {
                200: {
                    description: "Avaliação encontrada",
                    content: {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "movieId": 1,
                                "userId": 1,
                                "rating": "5.0",
                                "comment": "Ótimo Filme",
                                "createdAt": "2026-03-29T17:52:34.317Z",
                                "updatedAt": "2026-03-30T00:05:38.592Z"
                            }
                        }
                    }
                },
                404: {
                    description: "Avaliação não encontrada",
                    content: {
                        "application/json": {
                            "example": { "message": "Avaliação com id 1 não encontrada" }
                        }
                    }
                }
            }
        },
        put: {
            summary: "Atualiza uma avaliação",
            tags: ["Ratings"],
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "integer" } }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": { schema: { $ref: "#/components/schemas/RatingUpdate" } }
                }
            },
            responses: {
                200: {
                    description: "Avaliação atualizada",
                    content: {
                        "application/json": {
                            "example": {
                                "id": 1,
                                "movieId": 1,
                                "userId": 1,
                                "rating": "5.0",
                                "comment": "Ótimo Filme",
                                "createdAt": "2026-03-29T17:52:34.317Z",
                                "updatedAt": "2026-03-30T00:05:38.592Z"
                            }
                        }
                    }
                },
                400: {
                    description: "Campos inválidos",
                    content: {
                        "application/json": {
                            "example": { "message": "Um comentário ou avaliação deve ser inserido" }
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
                            "example": { "message": "Você não tem permissão para alterar essa avaliação" }
                        }
                    }
                },
                404: {
                    description: "Avaliação não encontrada",
                    content: {
                        "application/json": {
                            "example": { "message": "Avaliação não encontrada" }
                        }
                    }
                }
            }
        },
        delete: {
            summary: "Remove avaliação",
            tags: ["Ratings"],
            security: [{ "bearerAuth": [] }],
            parameters: [
                { "name": "id", "in": "path", "required": true, "schema": { "type": "integer" } }
            ],
            responses: {
                200: {
                    description: "Avaliação deletada",
                    content: {
                        "application/json": {
                            "example": { "message": "Avaliação removida com sucesso" }
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
                            "example": { "message": "Você não tem permissão para excluir essa avaliação" }
                        }
                    }
                },
                404: {
                    description: "Avaliação não encontrada",
                    content: {
                        "application/json": {
                            "example": { "message": "Avaliação não encontrada" }
                        }
                    }
                }
            }
        }
    }
};