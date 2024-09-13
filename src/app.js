const express = require("express");
const sequelize = require("./models/index");
const filmeRoutes = require("./routes/filme");
const cors = require("cors");

const app = express();
app.use(express.json());

// Carregar as rotas

app.use(cors());
app.use("/filmes", filmeRoutes);

// Função para iniciar o servidor
const startServer = async () => {
  try {
    // Sincronizar com o banco de dados
    await sequelize.sync();
    console.log("Banco de dados sincronizado com sucesso!");

    // Definir a porta
    const port = process.env.PORT || 3000;

    // Iniciar o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Erro ao sincronizar com o banco de dados:", error);
  }
};

// Iniciar o servidor
startServer();

module.exports = app;
