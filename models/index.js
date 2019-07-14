'use strict';
// gives access to the node env
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// will look in env or development
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
// checks if any env variable is set
if (config.use_env_variable) {
  // if it is use the settings for that
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // if not use a new instance the db
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
// let's us know if our DB connection is good or not
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });
// reading the files and importing sequelize
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
// allows us to use associatation or relationships for our db
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
