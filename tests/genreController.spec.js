const genreService = require("../services/genreService");
const controller = require("../controllers/genreController");

jest.mock("../services/genreService");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe("findAll", () => {
  it("deve retornar lista de gêneros", async () => {
    const req = {};
    const res = mockResponse();

    const genres = [{ id: 1 }, { id: 2 }];
    genreService.findAll.mockResolvedValue(genres);

    await controller.findAll(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(genres);
  });
});


describe("findById", () => {
  it("deve retornar gênero quando encontrado", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    const genre = { id: 1 };
    genreService.findById.mockResolvedValue(genre);

    await controller.findById(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(genre);
  });

  it("deve retornar 404 quando não encontrado", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    genreService.findById.mockResolvedValue(null);

    await controller.findById(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("create", () => {
  it("deve criar gênero com sucesso", async () => {
    const req = {
      body: { name: "Ação" }
    };
    const res = mockResponse();

    const newGenre = { id: 1, name: "Ação" };
    genreService.create.mockResolvedValue(newGenre);

    await controller.create(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newGenre);
  });

  it("deve retornar 400 se não enviar name", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await controller.create(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("update", () => {
  it("deve atualizar gênero", async () => {
    const req = {
      params: { id: "1" },
      body: { name: "Drama" }
    };
    const res = mockResponse();

    const updated = { id: 1, name: "Drama" };
    genreService.update.mockResolvedValue(updated);

    await controller.update(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it("deve retornar 404 se não encontrado", async () => {
    const req = {
      params: { id: "1" },
      body: { name: "Drama" }
    };
    const res = mockResponse();

    genreService.update.mockResolvedValue(null);

    await controller.update(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("deve retornar 400 se não enviar name", async () => {
    const req = {
      params: { id: "1" },
      body: {}
    };
    const res = mockResponse();

    await controller.update(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("deleteGenre", () => {
  it("deve deletar gênero", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    genreService.deleteGenre.mockResolvedValue(true);

    await controller.deleteGenre(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deve retornar 404 se não encontrado", async () => {
    const req = { params: { id: "1" } };
    const res = mockResponse();

    genreService.deleteGenre.mockResolvedValue(null);

    await controller.deleteGenre(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});