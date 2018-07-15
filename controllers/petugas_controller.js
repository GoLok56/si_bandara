const menuBuilder = require('../resource/menu_builder')
const sideMenuBuilder = require('../resource/side_menu_builder')

const Petugas = require('../models/petugas')

const { hash } = require('../utility/util')

const SECTION = 'Petugas';

const defaultParam = {
  title: 'Petugas - Sistem Informasi Bandara',
  sideMenus: sideMenuBuilder(SECTION),
  selectedMenu: SECTION
}

module.exports = {
  renderForm(req, res) {
    const { userLevel, userName } = req.session
    
    res.render('petugas/registrasi', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName
    })
  },

  async savePetugas(req, res) {
    const petugas = { ...req.body, password: hash(req.body.password) }
    
    try {
      await Petugas.create(petugas)
    } catch (err) {
      console.log(err);
      return;
    }
    
    res.send({
      status: 200,
      message: 'Berhasil melakukan registrasi petugas yang baru'
    })
  },

  async renderList(req, res) {
    const { userLevel, userName } = req.session
    
    let petugas;
    try {
      petugas = await Petugas.findAll({
        order: ['jenis_petugas']
      })
    } catch (err) {
      console.log(err)
      return
    }

    res.render('petugas/list', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      petugases: petugas
    })
  },
  
  async delete(req, res) {
    try {
      await Petugas.destroy({
        where: {
          id_petugas: req.body.id_petugas
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
    
    let petugas;
    try {
      petugas = await Petugas.findOne({
        where: {
          id_petugas: req.params.id
        }
      })
    } catch (err) {
      console.log(err)
      return
    }

    if (!petugas) {
      return res.redirect('/petugas')
    }

    res.render('petugas/ubah', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      petugas: petugas
    })
  },

  async updatePetugas(req, res) {
    const petugas = { ...req.body, password: hash(req.body.password) }

    try {
      await Petugas.update(petugas, {
        where: {
          id_petugas: petugas.id_petugas
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