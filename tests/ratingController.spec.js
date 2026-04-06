
const ratingService = require("../services/ratingService");
const controller = require("../controllers/ratingController");

jest.mock("../services/ratingService");


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();


describe("findAll", () => {
    it("deve retornar lista de ratings", async () => {
        const req = {};
        const res = mockResponse();

        const mockRatings = [{ id: 1 }, { id: 2 }];
        ratingService.findAll.mockResolvedValue(mockRatings);

        await controller.findAll(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockRatings);
    });
});


describe("findById", () => {
    it("deve retornar rating quando encontrado", async () => {
        const req = { params: { id: "1" } };
        const res = mockResponse();

        const rating = { id: 1 };
        ratingService.findById.mockResolvedValue(rating);

        await controller.findById(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(rating);
    });

    it("deve retornar 404 quando não encontrado", async () => {
        const req = { params: { id: "1" } };
        const res = mockResponse();

        ratingService.findById.mockResolvedValue(null);

        await controller.findById(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(404);
    });
});


describe("create", () => {
    it("deve criar um rating com sucesso", async () => {
        const req = {
            body: { rating: 5, movieId: 10 },
            user: { id: 1 }
        };
        const res = mockResponse();

        const newRating = { id: 1 };
        ratingService.create.mockResolvedValue(newRating);

        await controller.create(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newRating);
    });

    it("deve retornar 400 se faltar dados", async () => {
        const req = {
            body: {},
            user: { id: 1 }
        };
        const res = mockResponse();

        await controller.create(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
    });
});


describe("update", () => {
    it("deve atualizar rating", async () => {
        const req = {
            params: { id: "1" },
            body: { rating: 4 },
            user: { id: 1 }
        };
        const res = mockResponse();

        const updated = { id: 1, rating: 4 };
        ratingService.update.mockResolvedValue(updated);

        await controller.update(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updated);
    });

    it("deve retornar 404 se não encontrado", async () => {
        const req = {
            params: { id: "1" },
            body: { rating: 4 },
            user: { id: 1 }
        };
        const res = mockResponse();

        ratingService.update.mockResolvedValue(null);

        await controller.update(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    it("deve retornar 400 se não enviar dados", async () => {
        const req = {
            params: { id: "1" },
            body: {},
            user: { id: 1 }
        };
        const res = mockResponse();

        await controller.update(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
    });
});


describe("deleteRating", () => {
    it("deve deletar rating", async () => {
        const req = {
            params: { id: "1" },
            user: { id: 1 }
        };
        const res = mockResponse();

        ratingService.deleteRating.mockResolvedValue(true);

        await controller.deleteRating(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    it("deve retornar 404 se não encontrado", async () => {
        const req = {
            params: { id: "1" },
            user: { id: 1 }
        };
        const res = mockResponse();

        ratingService.deleteRating.mockResolvedValue(null);

        await controller.deleteRating(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(404);
    });
});