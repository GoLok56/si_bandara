const Sequelize = require('sequelize');

const database = require('../services/database');

const Maskapai = database.define('maskapai', {
  kode_maskapai: {
    type: Sequelize.CHAR(3),
    allowNull: false,
    primaryKey: true
  },
  nama_maskapai: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'maskapai'
});

module.exports = Maskapai;