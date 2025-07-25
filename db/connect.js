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
    // Adicione a porta, se o MariaDB não estiver na porta padrão 3306
    // port: config.db.port || 3306,
  }
);

// Função para testar a conexão e sincronizar os modelos
async function connectDB() {
  // Renomeado para connectDB para corresponder à importação no index.js
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados MySQL estabelecida com sucesso.");
    await sequelize.sync({ alter: true }); // Use { alter: true } em dev para atualizar tabelas
    // Ou { force: true } para recriar (apaga dados!)
    console.log("Modelos sincronizados com o banco de dados.");
  } catch (error) {
    console.error(
      "Não foi possível conectar ou sincronizar o banco de dados:",
      error
    );
    throw error; // Propaga o erro para que startApp no index.js possa capturá-lo e sair
  }
}

// Remova a chamada testConnection() daqui para que ela seja chamada apenas no index.js
// testConnection();

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
  connectDB: connectDB, // <<<<<<<<<<<<< AGORA EXPORTAMOS connectDB >>>>>>>>>>>>>
};
