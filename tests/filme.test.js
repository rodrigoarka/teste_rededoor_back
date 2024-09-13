const request = require("supertest");
const app = require("../src/app");
const Filme = require("../src/models/filme");
const Reserva = require("../src/models/reserva");

describe("Filmes API", () => {
  it("Deve listar filmes", async () => {
    const res = await request(app).get("/filmes");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
describe("Filmes Disponíveis API", () => {
  it("Deve listar apenas filmes disponíveis para locação", async () => {
    // Criando filmes para o teste
    await Filme.create({
      titulo: "Matrix",
      synopsis: "Sci-fi",
      rating: "PG-13",
      disponivel: true,
    });
    await Filme.create({
      titulo: "Inception",
      synopsis: "Dream within a dream",
      rating: "PG-13",
      disponivel: false,
    });

    const res = await request(app).get("/filmes/disponiveis");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1); // Somente o filme "Matrix" deve estar disponível
    expect(res.body[0].name).toBe("Matrix");
  });
});
describe("Reservar Filme API", () => {
  it("Deve reservar um filme por 3 horas e retornar reserveId", async () => {
    const filme = await Filme.create({
      titulo: "Matrix",
      synopsis: "Sci-fi",
      rating: "PG-13",
      disponivel: true,
    });

    const res = await request(app)
      .post("/filmes/reservar")
      .send({ movieId: filme.id });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("reserveId");

    const reserva = await Reserva.findByPk(res.body.reserveId);
    expect(reserva).not.toBeNull();
    expect(new Date(reserva.expiresAt) - Date.now()).toBeLessThan(
      3 * 60 * 60 * 1000
    );
  });
});
