const menuBuilder = require('../resource/menu_builder')
const mainMenuBuilder = require('../resource/main_menu_builder')
const mainMenuTitle = require('../resource/main_menu_title')

const Petugas = require('../models/petugas')

const { check } = require('../utility/util')

module.exports = {
  renderBeranda(req, res) {
    const { userLevel } = req.session

    res.render('index', {
      title: 'Beranda - Sistem Informasi Bandara',
      menus: menuBuilder(userLevel),
      mainMenus: mainMenuBuilder(userLevel),
      selectedMenu: 'Beranda',
      sideMenus: null,
      mainMenuTitle: mainMenuTitle(userLevel)
    })
  },

  renderLoginForm(req, res) {
    res.render('login')
  },

  logout(req, res) {
    req.session.destroy()
    res.redirect('/')
  },

  async login(req, res) {
    let petugas

    try {
      petugas = await Petugas.findOne({
        where: {
          username: req.body.username
        }
      })
    } catch (err) {
      console.log(err)
      return
    }

    if (!petugas) {
      return res.send({
        status: 404,
        message: `Tidak ditemukan petugas dengan username ${req.body.username}`
      })
    }

    if (check(petugas.password, req.body.password)) {
      req.session.hasLogin = true
      req.session.userName = petugas.nama_petugas
      req.session.userLevel = petugas.jenis_petugas
      req.session.username = petugas.username
      req.session.userId = petugas.id_petugas
      return res.send({
        status: 200
      })
    }

    res.send({
      status: 401,
      message: 'Password yang dimasukkan salah'
    })
  }
}