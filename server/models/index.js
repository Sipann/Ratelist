'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
require('dotenv').config();
// const envConfigs = require('../config');
const envConfigs = require('../config/config');
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

const db = new Sequelize(
  config.DB_NAME,
  config.DB_USERNAME,
  config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: config.DB_DIALECT,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

db
  .authenticate()
  .then(() => {
    console.log('** database connected **');              // eslint-disable-line no-console
  })
  .catch(err => {
    console.error('! database connection error !', err);  // eslint-disable-line no-console
  });

//readDirSync reads files in models folder

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = db['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

db.sync(); //{force:true} to drop the tables (if changes on the models are made)

module.exports = db;