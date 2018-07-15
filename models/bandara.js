const Sequelize = require('sequelize');

const database = require('../services/database');

const Bandara = database.define('bandara', {
  kode_bandara: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nama_bandara: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  kota: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'bandara'
});

module.exports = Bandara;