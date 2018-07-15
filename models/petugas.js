const Sequelize = require('sequelize');

const database = require('../services/database');

const Petugas = database.define('petugas', {
  id_petugas: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(30),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  jenis_petugas: {
    type: Sequelize.ENUM('Admin', 'Pemesanan', 'Check In'),
    allowNull: false
  },
  nama_petugas: {
    type: Sequelize.STRING(30),
    allowNull: false
  } 
}, {
  timestamps: false,
  tableName: 'petugas'
});

module.exports = Petugas;