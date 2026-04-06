const movieService = require("../services/movieService");
const controller = require("../controllers/movieController");

jest.mock("../services/movieService");

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe("findAll", () => {
    it("deve retornar lista de filmes", async () => {
        const req = {};
        const res = mockResponse();

        const movies = [{ id: 1 }, { id: 2 }];
        movieService.findAll.mockResolvedValue(movies);

        await controller.findAll(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(movies);
    });
});

describe("findById", () => {
    it("deve retornar filme quando encontrado", async () => {
        const req = { params: { id: "1" } };
        const res = mockResponse();

        const movie = { id: 1 };
        movieService.findById.mockResolvedValue(movie);

        await controller.findById(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(movie);
    });

    it("deve retornar 404 quando não encontrado", async () => {
        const req = { params: { id: "1" } };
        const res = mockResponse();

        movieService.findById.mockResolvedValue(null);

        await controller.findById(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(404);
    });
});

describe("create", () => {
    it("deve criar filme com sucesso", async () => {
        const req = {
            body: { title: "Filme", genres: [1, 2] }
        };
        const res = mockResponse();

        const newMovie = { id: 1 };
        movieService.create.mockResolvedValue(newMovie);

        await controller.create(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newMovie);
    });

    it("deve retornar 400 se faltar campos", async () => {
        const req = { body: {} };
        const res = mockResponse();

        await controller.create(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("deve retornar 400 se genres não for array", async () => {
        const req = {
            body: { title: "Filme", genres: "acao" }
        };
        const res = mockResponse();

        await controller.create(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("deve retornar 400 se genres estiver vazio", async () => {
        const req = {
            body: { title: "Filme", genres: [] }
        };
        const res = mockResponse();

        await controller.create(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("deve retornar 400 se genres tiver valores inválidos", async () => {
        const req = {
            body: { title: "Filme", genres: [1, "a"] }
        };
        const res = mockResponse();

        await controller.create(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
    });
});

describe("update", () => {
    it("deve atualizar filme", async () => {
        const req = {
            params: { id: "1" },
            body: { title: "Novo", genres: [1] }
        };
        const res = mockResponse();

        const updated = { id: 1, title: "Novo" };
        movieService.update.mockResolvedValue(updated);

        await controller.update(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updated);
    });

    it("deve retornar 404 se não encontrado", async () => {
        const req = {
            params: { id: "1" },
            body: { title: "Novo", genres: [1] }
        };
        const res = mockResponse();

        movieService.update.mockResolvedValue(null);

        await controller.update(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    it("deve validar campos obrigatórios", async () => {
        const req = {
            params: { id: "1" },
            body: {}
        };
        const res = mockResponse();

        await controller.update(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("deve validar genres como array", async () => {
        const req = {
            params: { id: "1" },
            body: { title: "Filme", genres: "erro" }
        };
        const res = mockResponse();

        await controller.update(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
    });
});

describe("deleteMovie", () => {
    it("deve deletar filme", async () => {
        const req = { params: { id: "1" } };
        const res = mockResponse();

        movieService.deleteMovie.mockResolvedValue(true);

        await controller.deleteMovie(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    it("deve retornar 404 se não encontrado", async () => {
        const req = { params: { id: "1" } };
        const res = mockResponse();

        movieService.deleteMovie.mockResolvedValue(null);

        await controller.deleteMovie(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(404);
    });
});