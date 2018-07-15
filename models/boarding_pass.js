const Sequelize = require('sequelize');

const database = require('../services/database');

const BoardingPass = database.define('boarding_pass', {
  id_boarding_pass: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nama_penumpang: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  no_gerbang: {
    type: Sequelize.CHAR(3),
    allowNull: false
  },
  no_kursi: {
    type: Sequelize.CHAR(3),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'boarding_pass'
});

BoardingPass.belongsTo(Pemesanan, {
  foreignKey: {
    name: 'id_pemesanan',
    allowNull: false
  }
})

module.exports = BoardingPass;