const authService = require("../services/authService");
const controller = require("../controllers/authController");

jest.mock("../services/authService");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe("login", () => {
  it("deve fazer login com sucesso", async () => {
    const req = {
      body: { email: "teste@email.com", password: "123456" }
    };
    const res = mockResponse();

    const result = { token: "abc123" };
    authService.login.mockResolvedValue(result);

    await controller.login(req, res, mockNext);

    expect(authService.login).toHaveBeenCalledWith(
      "teste@email.com",
      "123456"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it("deve retornar 400 se faltar email ou password", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await controller.login(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("signup", () => {
  it("deve criar usuário com role padrão (0)", async () => {
    const req = {
      body: { name: "João", email: "joao@email.com", password: "123" }
    };
    const res = mockResponse();

    const newUser = { id: 1, role: 0 };
    authService.signup.mockResolvedValue(newUser);

    await controller.signup(req, res, mockNext);

    expect(authService.signup).toHaveBeenCalledWith({
      name: "João",
      email: "joao@email.com",
      password: "123",
      role: 0
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newUser);
  });

  it("deve retornar 400 se faltar campos obrigatórios", async () => {
    const req = { body: {} };
    const res = mockResponse();

    await controller.signup(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("deve permitir criar usuário com role maior se for admin", async () => {
    const req = {
      body: {
        name: "Admin",
        email: "admin@email.com",
        password: "123",
        role: 1
      },
      user: { role: 1 } // admin logado
    };
    const res = mockResponse();

    const newUser = { id: 2, role: 1 };
    authService.signup.mockResolvedValue(newUser);

    await controller.signup(req, res, mockNext);

    expect(authService.signup).toHaveBeenCalledWith({
      name: "Admin",
      email: "admin@email.com",
      password: "123",
      role: 1
    });

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("deve retornar 403 se tentar criar usuário com role maior sem ser admin", async () => {
    const req = {
      body: {
        name: "User",
        email: "user@email.com",
        password: "123",
        role: 1
      },
      user: { role: 0 } // não é admin
    };
    const res = mockResponse();

    await controller.signup(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});