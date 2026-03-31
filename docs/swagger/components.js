// docs/swagger/components.js
module.exports = {
  schemas: {
    Rating: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        movieId: { type: "integer", example: 10 },
        userId: { type: "integer", example: 5 },
        rating: { type: "number", example: 4.5 },
        comment: { type: "string", example: "Ótimo filme!" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" }
      }
    },
    RatingInput: {
      type: "object",
      required: ["movieId", "rating"],
      properties: {
        movieId: { type: "integer", example: 10 },
        rating: { type: "number", example: 4.5 },
        comment: { type: "string", example: "Muito bom!" }
      }
    },
    RatingUpdate: {
      type: "object",
      properties: {
        rating: { type: "number", example: 5 },
        comment: { type: "string", example: "Melhor do que eu lembrava" }
      }
    },
    Genre: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        name: { type: "string", example: "Comedy" }
      }
    },
    GenreInput: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", example: "Comedy" }
      }
    },
    Movie: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        title: { type: "string", example: "Toy Story (1995)" },
        genres: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Genre"
          }
        }
      }
    },
    MovieInput: {
      type: "object",
      required: ["title", "genres"],
      properties: {
        title: { type: "string", example: "Toy Story (1995)" },
        genres: {
          type: "array",
          items: {
            type: "integer"
          },
          example: [1, 2, 3]
        }
      }
    },
    User: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        name: { type: "string", example: "John Doe" },
        email: { type: "string", example: "johndoe@example.com" },
        role: { type: "integer", example: 0 },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" }
      }
    },
    UserInput: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: { type: "string", example: "John Doe" },
        email: { type: "string", example: "johndoe@example.com" },
        password: { type: "string", example: "minha_senha_123" },
        role: { type: "integer", example: 0 },
      }
    },
    UserUpdate: {
      type: "object",
      properties: {
        name: { type: "string", example: "John Doe" },
        email: { type: "string", example: "johndoe@example.com" },
        password: { type: "string", example: "minha_senha_123" },
        role: { type: "integer", example: 0 },
      }
    },
  },
  securitySchemes: {
    bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
  }
};