const Sequelize = require('sequelize');

const database = require('../services/database');
const NamaPenumpang = require('./nama_penumpang')
const Jadwal = require('./jadwal')
const Petugas = require('./petugas')

const Pemesanan = database.define('pemesanan', {
  id_Pemesanan: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  no_telepon: {
    type: Sequelize.STRING(13),
    allowNull: false
  },
  tanggal_keberangkatan: {
    type: Sequelize.DATE,
    allowNull: false
  },
  tanggal_pemesanan: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  jumlah_tiket: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  harga_total: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status_refund: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: false,
  tableName: 'pemesanan'
});

Pemesanan.hasMany(NamaPenumpang, {
  foreignKey: {
    name: 'id_pemesanan',
    allowNull: false
  }
})

Pemesanan.belongsTo(Petugas, {
  foreignKey: {
    name: 'id_petugas',
    allowNull: false
  }
})

Pemesanan.belongsTo(Jadwal, {
  foreignKey: {
    name: 'id_jadwal',
    allowNull: false
  }
})

module.exports = Pemesanan;