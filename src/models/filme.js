const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Filme = sequelize.define("Filme", {
  id: {
    type: DataTypes.UUID, // Deve ser UUID
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Filme;
