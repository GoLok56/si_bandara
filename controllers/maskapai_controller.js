const menuBuilder = require('../resource/menu_builder')
const sideMenuBuilder = require('../resource/side_menu_builder')

const Maskapai = require('../models/maskapai')

const SECTION = 'Maskapai';

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
      console.log(err);
      return;
    }
    
    res.send({
      status: 200,
      message: 'Berhasil melakukan penambahan maskapai yang baru'
    })
  },

  async renderList(req, res) {
    const { userLevel, userName } = req.session
    
    let maskapai;
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
    
    let maskapai;
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
  }
}