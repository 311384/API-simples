// conectar ao banco mysql

const mysql = require("mysql2/promise");
const config = require("../config"); // Certifique-se de que este arquivo config.js existe e exporta as credenciais
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.db.database, // Usando config para o nome do banco
  config.db.user, // Usando config para o usuário
  config.db.password, // Usando config para a senha
  {
    host: config.db.host, // Usando config para o host
    dialect: "mysql",
    logging: false, // Opcional: desativa logs SQL do Sequelize para o console
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados MySQL estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
}

testConnection();

// Você pode remover este bloco se for usar SOMENTE o Sequelize para todas as interações com o DB.
// Se você planeja usar consultas SQL cruas via mysql2/promise diretamente em alguns lugares, mantenha-o.
const connection = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  sequelize: sequelize, // Exporta a instância do Sequelize
  connection: connection, // Exporta o pool de conexões do mysql2/promise
};
