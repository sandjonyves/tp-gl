const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.DB_TYPE === 'postgres') {

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false, 
    }
  );
} else {

  const sqlite3 = require('sqlite3');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sequelize.sqlite',
    dialectModule: sqlite3,
    logging: false,
  });
}

module.exports = sequelize;