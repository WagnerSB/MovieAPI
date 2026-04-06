const userService = require("../services/userService");
const controller = require("../controllers/userController");

jest.mock("../services/userService");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe("findAll", () => {
  it("deve retornar lista de usuários", async () => {
    const req = {};
    const res = mockResponse();

    const users = [{ id: 1 }];
    userService.findAll.mockResolvedValue(users);

    await controller.findAll(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users);
  });
});

describe("findById", () => {
  it("deve permitir ver próprio usuário", async () => {
    const req = {
      params: { id: "1" },
      user: { id: 1, role: 0 }
    };
    const res = mockResponse();

    const user = { id: 1 };
    userService.findById.mockResolvedValue(user);

    await controller.findById(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deve permitir admin ver qualquer usuário", async () => {
    const req = {
      params: { id: "2" },
      user: { id: 1, role: 1 }
    };
    const res = mockResponse();

    userService.findById.mockResolvedValue({ id: 2 });

    await controller.findById(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deve bloquear acesso a outro usuário", async () => {
    const req = {
      params: { id: "2" },
      user: { id: 1, role: 0 }
    };
    const res = mockResponse();

    await controller.findById(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  it("deve retornar 404 se não encontrado", async () => {
    const req = {
      params: { id: "1" },
      user: { id: 1, role: 0 }
    };
    const res = mockResponse();

    userService.findById.mockResolvedValue(null);

    await controller.findById(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("create", () => {
  it("deve criar usuário normal", async () => {
    const req = {
      body: { name: "João", email: "a@a.com", password: "123" }
    };
    const res = mockResponse();

    const newUser = { id: 1 };
    userService.create.mockResolvedValue(newUser);

    await controller.create(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("deve retornar 400 se faltar campos", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await controller.create(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("deve impedir criar admin sem permissão", async () => {
    const req = {
      body: { name: "Admin", email: "a@a.com", password: "123", role: 1 },
      user: { role: 0 }
    };
    const res = mockResponse();

    await controller.create(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  it("deve permitir admin criar admin", async () => {
    const req = {
      body: { name: "Admin", email: "a@a.com", password: "123", role: 1 },
      user: { role: 1 }
    };
    const res = mockResponse();

    userService.create.mockResolvedValue({ id: 2 });

    await controller.create(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("update", () => {
  it("deve atualizar próprio usuário", async () => {
    const req = {
      params: { id: "1" },
      body: { name: "Novo" },
      user: { id: 1, role: 0 }
    };
    const res = mockResponse();

    userService.update.mockResolvedValue({ id: 1 });

    await controller.update(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deve permitir admin atualizar outro usuário", async () => {
    const req = {
      params: { id: "2" },
      body: { name: "Novo" },
      user: { id: 1, role: 1 }
    };
    const res = mockResponse();

    userService.update.mockResolvedValue({ id: 2 });

    await controller.update(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deve bloquear usuário comum", async () => {
    const req = {
      params: { id: "2" },
      body: { name: "Novo" },
      user: { id: 1, role: 0 }
    };
    const res = mockResponse();

    await controller.update(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  it("deve validar campos vazios", async () => {
    const req = {
      params: { id: "1" },
      body: {},
      user: { id: 1, role: 0 }
    };
    const res = mockResponse();

    await controller.update(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("deve retornar 404 se não encontrado", async () => {
    const req = {
      params: { id: "1" },
      body: { name: "Novo" },
      user: { id: 1, role: 0 }
    };
    const res = mockResponse();

    userService.update.mockResolvedValue(null);

    await controller.update(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("deleteUser", () => {
  it("deve deletar próprio usuário", async () => {
    const req = {
      params: { id: "1" },
      user: { id: 1, role: 0 }
    };
    const res = mockResponse();

    userService.deleteUser.mockResolvedValue(true);

    await controller.deleteUser(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deve permitir admin deletar outro usuário", async () => {
    const req = {
      params: { id: "2" },
      user: { id: 1, role: 1 }
    };
    const res = mockResponse();

    userService.deleteUser.mockResolvedValue(true);

    await controller.deleteUser(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deve bloquear usuário comum", async () => {
    const req = {
      params: { id: "2" },
      user: { id: 1, role: 0 }
    };
    const res = mockResponse();

    await controller.deleteUser(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  it("deve retornar 404 se não encontrado", async () => {
    const req = {
      params: { id: "1" },
      user: { id: 1, role: 0 }
    };
    const res = mockResponse();

    userService.deleteUser.mockResolvedValue(null);

    await controller.deleteUser(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});