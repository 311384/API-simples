const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const config = require("./config");
const port = config.port;

const { sequelize, connectDB } = require("./db/connect");

// Removida a importação direta do modelo Product aqui,
// pois o modelo deve ser importado dentro de 'productRoutes.js' onde é usado.
// const Product = require("./model/squima");

// <<<<<<<<<<<<<<<< ORDEM DOS MIDDLEWARES É CRÍTICA >>>>>>>>>>>>>>>>>>
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// <<<<<<<<<<<<<<<< FIM DA ORDEM DOS MIDDLEWARES >>>>>>>>>>>>>>>>>>

// --- Importação e Uso das Rotas de Produto ---
const productRoutes = require("./routes/productRoutes");
app.use("/api", productRoutes); // <<<<<<<<<<<<< AGORA USAMOS AS ROTAS DE PRODUTO AQUI >>>>>>>>>>>>>
// Todas as rotas em productRoutes.js terão o prefixo '/api'

// Rotas genéricas da sua API (mantidas se não forem para productRoutes)
app.get("/api", (req, res) => {
  res.json({ message: "Hello from API!" });
});

app.get("/api/data", (req, res) => {
  res.json({ data: [1, 2, 3, 4, 5] });
});

// <<<<<<<<<<<<<<<< REMOVIDAS AS ROTAS DE PRODUTO DUPLICADAS AQUI >>>>>>>>>>>>>>>>>>
// app.post("/api/produtos", ...);
// app.get("/api/produtos", ...);

// Rota raiz para servir o index.html principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// <<<<<<<<<<<<<<<< INÍCIO DO SERVIDOR >>>>>>>>>>>>>>>>>>
async function startApp() {
  try {
    await connectDB(); // Conecta e sincroniza o DB
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
      console.log(`Acesse o frontend em: http://localhost:${port}🚀🚀🚀`);
      console.log(
        `Rotas da API de produtos em: http://localhost:${port}/api/products`
      );
    });
  } catch (error) {
    console.error("Falha ao iniciar a aplicação:", error);
    process.exit(1);
  }
}

startApp();
