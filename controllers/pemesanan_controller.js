const moment = require('moment')

const menuBuilder = require('../resource/menu_builder')

const Pemesanan = require('../models/pemesanan')
const Bandara = require('../models/bandara')
const Jadwal = require('../models/jadwal')
const NamaPenumpang = require('../models/nama_penumpang')

const defaultParam = {
  title: 'Pemesanan - Sistem Informasi Bandara',
  sideMenus: null
}

module.exports = {
  async renderList(req, res) {
    const { userLevel, userName } = req.session

    let pemesanans
    try {
      pemesanans = await Pemesanan.findAll()
    } catch (err) {
      console.log(err)
      return
    }

    res.render('pemesanan/list', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      selectedMenu: 'Lihat Pemesanan',
      pemesanans: pemesanans
    })
  },

  async renderForm(req, res) {
    const { userLevel, userName } = req.session
    
    let bandaras
    try {
      bandaras = await Bandara.findAll({
        order: ['kota', 'nama_bandara']
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.render('pemesanan/tambah', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      selectedMenu: 'Tambah Pemesanan',
      bandaras: bandaras
    })
  },

  async renderForm2(req, res) {
    const { userLevel, userName } = req.session
    
    let jadwal
    try {
      jadwal = await Jadwal.findOne({
        where: {
          id_jadwal: req.params.id
        }
      })
    } catch (err) {
      console.log(err)
      return
    }

    if (!jadwal) {
      return res.redirect('/pemesanan/tambah')
    }

    res.render('pemesanan/tambah_2', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      selectedMenu: 'Tambah Pemesanan',
      jadwal: req.params.id,
      hargaTiket: jadwal.harga
    })
  },

  async renderRefund(req, res) {
    const { userLevel, userName } = req.session

    let pemesanans
    try {
      pemesanans = await Pemesanan.findAll({
        where: {
          status_refund: 0
        }
      }) 
    } catch (err) {
      console.log(err)
      return
    }

    res.render('pemesanan/refund', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      selectedMenu: 'Pengembalian Uang',
      pemesanans: pemesanans
    })
  },

  async renderReschedule(req, res) {
    const { userLevel, userName } = req.session

    let pemesanan
    try {
      pemesanan = await Pemesanan.findOne({
        where: {
          id_pemesanan: req.params.id
        },
        include: [{ all: true, required: true }]
      })
    } catch (err) {
      console.log(err)
      return
    }

    let jadwal
    try {
      jadwal = await Jadwal.findOne({
        where: {
          id_jadwal: pemesanan.id_jadwal
        }
      })
    } catch (err) {
      console.log(err)
      return
    }

    let jadwals
    try {
      jadwals = await Jadwal.findAll({
        where: {
          kode_bandara_asal: jadwal.kode_bandara_asal,
          kode_bandara_tujuan: jadwal.kode_bandara_tujuan,
          kode_maskapai: jadwal.kode_maskapai
        },
        include: [{ all: true, required: true }]
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.render('pemesanan/reschedule', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      selectedMenu: 'Tambah Pemesanan',
      jadwal: jadwal,
      jadwals: jadwals,
      pemesanan: pemesanan
    })
  },

  async savePemesanan(req, res) {
    const pemesanan = {
      ...req.body,
      id_petugas: req.session.userId,
      tanggal_pemesanan: moment().format('YYYY/MM/DD')
    }

    let pemesananBaru
    try {
      pemesananBaru = await Pemesanan.create(pemesanan)
    } catch (err) {
      console.log(err);
      return;
    }
    
    pemesanan['nama_penumpang[]'].forEach(async element => {
      try {
        await NamaPenumpang.create({
          nama_penumpang: element,
          id_pemesanan: pemesananBaru.id_pemesanan
        })
      } catch (err) {
        console.log(err)
        return
      }
    });

    res.send({
      status: 200,
      message: 'Berhasil melakukan penambahan bandara yang baru'
    })
  },

  async reschedule(req, res) {
    try {
      await Pemesanan.update(req.body, {
        where: {
          id_pemesanan: req.body.id_pemesanan
        }
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.send({ status: 200 })
  },
  
  async findById(req, res) {
    let pemesanan
    try {
      pemesanan = await Pemesanan.findOne({
        where: {
          id_pemesanan: req.params.id
        },
        include: [
          { 
            model: NamaPenumpang,
            as: 'nama_penumpang'
          }
        ]
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.send(pemesanan)
  }
}