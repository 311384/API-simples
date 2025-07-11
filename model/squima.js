const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connect"); // Importa a instância do Sequelize desestruturada

const Product = sequelize.define(
  "Product",
  {
    // Definindo os atributos do modelo (colunas da tabela)
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: true, // Permite que a categoria seja nula
    },
  },
  {
    tableName: "produtos", // Nome da tabela no banco de dados (o Sequelize criará esta tabela)
    timestamps: true, // Adiciona automaticamente createdAt e updatedAt (colunas createdAt e updatedAt)
  }
);

module.exports = Product; // Exporta o modelo Product para ser usado em outros lugares
