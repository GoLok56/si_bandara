const Sequelize = require('sequelize');

const database = require('../services/database');
const Bandara = require('./bandara')
const Maskapai = require('./maskapai')

const Jadwal = database.define('jadwal', {
  id_jadwal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  kode_penerbangan: {
    type: Sequelize.STRING(8),
    allowNull: false
  },
  jam_keberangkatan: {
    type: Sequelize.TIME,
    allowNull: false
  },
  jam_sampai: {
    type: Sequelize.TIME,
    allowNull: false
  },
  harga: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'jadwal'
});

Bandara.belongsToMany(Maskapai, { through: Jadwal, foreignKey: 'kode_bandara_asal' })
Bandara.belongsToMany(Maskapai, { through: Jadwal, foreignKey: 'kode_bandara_tujuan' })
Maskapai.belongsToMany(Bandara, { through: Jadwal, foreignKey: 'kode_maskapai' })

module.exports = Jadwal;