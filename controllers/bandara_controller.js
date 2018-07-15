const menuBuilder = require('../resource/menu_builder')
const sideMenuBuilder = require('../resource/side_menu_builder')

const Bandara = require('../models/bandara')

const SECTION = 'Bandara';

const defaultParam = {
  title: 'Bandara - Sistem Informasi Bandara',
  sideMenus: sideMenuBuilder(SECTION),
  selectedMenu: SECTION
}

module.exports = {
  renderForm(req, res) {
    const { userLevel, userName } = req.session
    
    res.render('bandara/tambah', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName
    })
  },

  async saveBandara(req, res) {
    try {
      await Bandara.create(req.body)
    } catch (err) {
      console.log(err);
      return;
    }
    
    res.send({
      status: 200,
      message: 'Berhasil melakukan penambahan bandara yang baru'
    })
  },

  async renderList(req, res) {
    const { userLevel, userName } = req.session
    
    let bandara;
    try {
      bandara = await Bandara.findAll({
        order: ['kota', 'nama_bandara']
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.render('bandara/list', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      bandaras: bandara
    })
  },
  
  async delete(req, res) {
    try {
      await Bandara.destroy({
        where: {
          kode_bandara: req.body.kode_bandara
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
    
    let bandara;
    try {
      bandara = await Bandara.findOne({
        where: {
          kode_bandara: req.params.id
        }
      })
    } catch (err) {
      console.log(err)
      return
    }

    if (!bandara) {
      return res.redirect('/bandara')
    }

    res.render('bandara/ubah', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      bandara: bandara
    })
  },

  async updateBandara(req, res) {
    try {
      await Bandara.update(req.body, {
        where: {
          kode_bandara: req.body.kode_bandara
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