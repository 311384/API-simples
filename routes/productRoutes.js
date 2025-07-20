const express = require("express");
const Product = require("../model/squima"); // Certifique-se que o caminho está correto

const router = express.Router(); // Mudei 'routes' para 'router' por convenção

// Rota POST para criar um novo produto
router.post("/products", async (req, res) => {
  // Removi '/api' aqui, será adicionado no index.js
  try {
    const { nome, preco, quantidade, categoria } = req.body;

    if (!nome || !preco) {
      return res.status(400).json({ error: "Nome e preço são obrigatórios." });
    }

    const newProduct = await Product.create({
      nome,
      preco,
      quantidade: quantidade || 0,
      categoria,
    });

    res
      .status(201)
      .json({ message: "Produto criado com sucesso!", product: newProduct });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao criar produto." });
  }
});

// Rota GET para buscar todos os produtos
router.get("/products", async (req, res) => {
  // Removi '/api' aqui
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

module.exports = router; // <<<<<<<<<<<<< CORRIGIDO: module.exports = router; >>>>>>>>>>>>>
