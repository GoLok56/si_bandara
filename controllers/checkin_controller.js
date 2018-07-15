const Pemesanan = require('../models/pemesanan')
const BoardingPass = require('../models/boarding_pass')

const menuBuilder = require('../resource/menu_builder')

const defaultParam = {
  title: 'Check In - Sistem Informasi Bandara',
  sideMenus: null
}

module.exports = {
  async checkin(req, res) {
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

    res.render('checkin/index', {
      ...defaultParam,
      menus: menuBuilder(userLevel),
      userName: userName,
      selectedMenu: 'Check In',
      pemesanans: pemesanans
    })
  },

  async saveCheckin(req, res) {
    try {
      await BoardingPass.create(req.body)
    } catch (err) {
      console.log(err)
      return
    }

    res.send({ status: 200 })
  }
}