// config.js
module.exports = {
  db: {
    host: "localhost",
    user: "root", // Usuário padrão do MySQL no XAMPP
    password: "", // Senha padrão do MySQL no XAMPP (DEIXE VAZIO, é uma string vazia!)
    database: "minha_api_db", // <--- ESCOLHA UM NOME PARA O SEU BANCO DE DADOS AQUI!
    // Ex: 'api_produtos_db', 'loja_db', etc.
  },
  port: process.env.PORT || 3000,
  // outras configurações...
};
