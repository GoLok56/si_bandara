const Sequelize = require('sequelize');

const database = require('../services/database');

const NamaPenumpang = database.define('nama_penumpang', {
  nama_penumpang: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'nama_penumpang'
});

module.exports = NamaPenumpang;