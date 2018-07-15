const menuBuilder = require('../resource/menu_builder')
const sideMenuBuilder = require('../resource/side_menu_builder')

const Maskapai = require('../models/maskapai')
const Bandara = require('../models/bandara')
const Jadwal = require('../models/jadwal')

const SECTION = 'Maskapai'

const defaultParam = {
  title: 'Maskapai - Sistem Informasi Bandara',
  sideMenus: sideMenuBuilder(SECTION),
  selectedMenu: SECTION
}

module.exports = {
  renderForm(req, res) {
    const { userLevel, userName } = req.session
    
    res.render('maskapai/tambah', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName
    })
  },

  async saveMaskapai(req, res) {
    try {
      await Maskapai.create(req.body)
    } catch (err) {
      console.log(err)
      return
    }
    
    res.send({
      status: 200,
      message: 'Berhasil melakukan penambahan maskapai yang baru'
    })
  },

  async renderList(req, res) {
    const { userLevel, userName } = req.session
    
    let maskapai
    try {
      maskapai = await Maskapai.findAll({
        order: ['nama_maskapai']
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.render('maskapai/list', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      maskapaies: maskapai
    })
  },
  
  async delete(req, res) {
    try {
      await Maskapai.destroy({
        where: {
          kode_maskapai: req.body.kode_maskapai
        }
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.send({
      status: 200
    })
  },

  async renderFormUbah(req, res) {
    const { userLevel, userName } = req.session
    
    let maskapai
    try {
      maskapai = await Maskapai.findOne({
        where: {
          kode_maskapai: req.params.id
        }
      })
    } catch (err) {
      console.log(err)
      return
    }

    if (!maskapai) {
      return res.redirect('/maskapai')
    }

    res.render('maskapai/ubah', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      maskapai: maskapai
    })
  },

  async updateMaskapai(req, res) {
    try {
      await Maskapai.update(req.body, {
        where: {
          kode_maskapai: req.body.kode_maskapai_lama
        }
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.send({
      status: 200
    })
  },

  async renderJadwal(req, res) {
    const { userLevel, userName } = req.session

    let maskapai
    try {
      maskapai = await Maskapai.findAll()
    } catch (err) {
      console.log(err)
      return
    }

    res.render('jadwal/list', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      maskapaies: maskapai,
      jadwals: []
    })
  },

  async renderJadwalForm(req, res) {
    const { userLevel, userName } = req.session

    let maskapai
    try {
      maskapai = await Maskapai.findAll({
        order: ['nama_maskapai']
      })
    } catch (err) {
      console.log(err)
      return
    }

    let bandara
    try {
      bandara = await Bandara.findAll({
        order: ['kota', 'nama_bandara']
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.render('jadwal/tambah', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      maskapaies: maskapai,
      bandaras: bandara
    })
  },

  async saveJadwal(req, res) {
    try {
      await Jadwal.create(req.body)
    } catch (err) {
      console.log(err)
      return
    }

    res.send({
      status: 200
    })
  },

  async findJadwal(req, res) {
    let jadwals
    try {
      jadwals = await Jadwal.findAll({
        where: {
          kode_maskapai: req.params.id
        },
        include: [{ all: true, required: true }]
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.send(jadwals)
  },

  async deleteJadwal(req, res) {
    try {
      await Jadwal.destroy({
        where: {
          id_jadwal: req.body.id_jadwal
        }
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.send({ status: 200 })
  },

  async renderJadwalFormUbah(req, res) {
    const { userLevel, userName } = req.session
    
    let jadwal
    try {
      jadwal = await Jadwal.findOne({
        where: {
          id_jadwal: req.params.id
        },
        include: [{ all: true, required: true }]
      })
    } catch (err) {
      console.log(err)
      return
    }

    let maskapai
    try {
      maskapai = await Maskapai.findOne({
        where: {
          kode_maskapai: jadwal.kode_maskapai
        },
      })
    } catch (err) {
      console.log(err)
      return
    }

    let bandara
    try {
      bandara = await Bandara.findAll({
        order: ['kota', 'nama_bandara']
      })
    } catch (err) {
      console.log(err)
      return
    }

    if (!maskapai) {
      return res.redirect('/maskapai/jadwal')
    }

    res.render('jadwal/ubah', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      maskapai: maskapai,
      bandaras: bandara,
      jadwal: jadwal
    })
  },

  async updateJadwal(req, res) {
    try {
      await Jadwal.update(req.body, {
        where: {
          id_jadwal: req.body.id_jadwal
        }
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.send({
      status: 200
    })
  }
}