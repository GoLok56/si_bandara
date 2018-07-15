module.exports = (userLevel) => {
  switch (userLevel) {
    case 'Admin':
      return require('./main_menu/admin_menu')
    case 'Pemesanan':
      return require('./main_menu/pemesanan_menu')
    default:
      return require('./main_menu/pemesanan_menu')
  }
}