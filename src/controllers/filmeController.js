const Filme = require("../models/filme");
const Reserva = require("../models/reserva");
const { Op } = require("sequelize");

module.exports = {
  async listar(req, res) {
    const filmes = await Filme.findAll();
    const formattedFilmes = filmes.map((filme) => ({
      id: filme.id,
      name: filme.titulo,
      synopsis: filme.synopsis,
      rating: filme.rating,
    }));

    res.json(formattedFilmes);
  },
  async criar(req, res) {
    const { titulo, synopsis, rating, disponivel } = req.body;

    if (!titulo || !synopsis || !rating || !disponivel) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }
    try {
      const novoFilme = await Filme.create({
        titulo,
        synopsis,
        rating,
        disponivel,
      });
      res.status(201).json(novoFilme);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar filme" });
    }
  },

  async listarDisponiveis(req, res) {
    try {
      const filmes = await Filme.findAll({
        where: { disponivel: true },
        attributes: ["id", "titulo", "synopsis", "rating"],
      });

      const formattedFilmes = filmes.map((filme) => ({
        id: filme.id,
        name: filme.titulo,
        synopsis: filme.synopsis,
        rating: filme.rating,
      }));

      res.json(formattedFilmes);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar filmes disponíveis" });
    }
  },
  async reservar(req, res) {
    const { movieId } = req.body;

    try {
      // Verifica se o filme existe e está disponível
      const filme = await Filme.findOne({
        where: { id: movieId, disponivel: true },
      });
      if (!filme) {
        return res
          .status(404)
          .json({ error: "Filme não disponível ou não encontrado" });
      }

      // Calcula o tempo de expiração da reserva (3 horas a partir do momento da reserva)
      const expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000);

      // Cria a reserva
      const reserva = await Reserva.create({
        movieId,
        expiresAt,
      });

      // Atualiza o filme para indisponível
      filme.disponivel = false;
      await filme.save();

      // Retorna o id da reserva
      res.json({ reserveId: reserva.reserveId });
    } catch (error) {
      res.status(500).json({ error: "Erro ao reservar o filme" });
    }
  },

  async confirmarLocacao(req, res) {
    const { id } = req.params;
    const filme = await Filme.findByPk(id);

    if (!filme) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    // Aqui você pode adicionar lógica adicional para confirmar a locação
    res.json({ message: "Locação confirmada" });
  },

  async devolver(req, res) {
    const { id } = req.params;
    const filme = await Filme.findByPk(id);

    if (!filme) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    filme.disponivel = true;
    await filme.save();
    res.json({ message: "Filme devolvido com sucesso" });
  },
};
