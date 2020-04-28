require('dotenv').config();

module.exports = {
  development: {
    DB_DIALECT: 'postgres',
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USERNAME: process.env.DB_USERNAME,
  },
  test: {
    DB_DIALECT: 'postgres',
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_NAME: process.env.TEST_DB_NAME,


    dialect: 'postgres',
    url: process.env.TEST_DATABASE_URL
  },
};