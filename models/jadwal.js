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
  },
  kelas: {
    type: Sequelize.ENUM('Ekonomi', 'Bisnis', 'First Class'),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'jadwal'
});

Bandara.belongsToMany(Maskapai, { 
  through: {
    model: Jadwal,
    unique: false 
  }, 
  foreignKey: 'kode_bandara_asal', 
  as: 'bandara_asal'
})

Bandara.belongsToMany(Maskapai, { 
  through: {
    model: Jadwal,
    unique: false 
  }, 
  foreignKey: 'kode_bandara_tujuan', 
  as: 'bandara_tujuan'
})

Maskapai.belongsToMany(Bandara, { 
  through: {
    model: Jadwal,
    unique: false 
  },
  foreignKey: 'kode_maskapai', 
  as: 'maskapai',
})

Jadwal.belongsTo(Bandara, {
  foreignKey: 'kode_bandara_asal',
  as: 'bandara_asal'
})

Jadwal.belongsTo(Bandara, {
  foreignKey: 'kode_bandara_tujuan',
  as: 'bandara_tujuan'
})

Jadwal.belongsTo(Maskapai, {
  foreignKey: 'kode_maskapai'
})

module.exports = Jadwal;