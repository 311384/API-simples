const express = require("express");
const app = express();

const config = require("./config");
const port = config.port;

// IMPORTANTE: Ajuste aqui para desestruturar 'sequelize'
// Se você for usar 'connection' do mysql2/promise em algum lugar, pode adicionar aqui também:
// const { sequelize, connection } = require("./db/connect");
const { sequelize } = require("./db/connect"); // Importa a instância do Sequelize

const Product = require("./model/squima"); // Importa o modelo Product

app.use(express.json()); // Middleware para parsear JSON

app.get("/", (req, res) => {
  res.send("Minha API!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from API!" });
});

app.get("/api/data", (req, res) => {
  res.json({ data: [1, 2, 3, 4, 5] });
});

// Rotas de produtos (seus endpoints da API)
app.post("/api/produtos", async (req, res) => {
  try {
    const { nome, preco, quantidade, categoria } = req.body;
    const newProduct = await Product.create({
      nome,
      preco,
      quantidade,
      categoria,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    res
      .status(500)
      .json({ message: "Erro ao adicionar produto", error: error.message });
  }
});

app.get("/api/produtos", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar produtos", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);

  // Sincroniza os modelos do Sequelize com o banco de dados
  sequelize
    .sync()
    .then(() => {
      console.log(
        "Todos os modelos (tabelas) foram sincronizados com o banco de dados."
      );
    })
    .catch((error) => {
      console.error("Erro ao sincronizar modelos:", error);
      process.exit(1);
    });
});
