const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Filme = require("./filme");

const Reserva = sequelize.define("Reserva", {
  reserveId: {
    type: DataTypes.UUID, // Mesmo tipo que 'id' em Filme
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  movieId: {
    type: DataTypes.UUID, // Deve ser UUID, compatível com 'Filmes.id'
    allowNull: false,
    references: {
      model: Filme, // Nome do model Filme
      key: "id", // Chave primária da tabela Filmes
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Reserva;
