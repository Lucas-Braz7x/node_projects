const Sequelize = require('sequelize');

// const database = process.env.DATABASE;
// const username = process.env.USERNAME;
// const password = process.env.PASSWORD;
// const hostDb = process.env.HOST;
// const dialectDB = process.env.DIALECT;

const connection = new Sequelize(
  'nodeAPI',
  'root',
  'Lucas7x!',
  {
    host: 'localhost', dialect: 'mysql',
  },
);

module.exports = connection;
