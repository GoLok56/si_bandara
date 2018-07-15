module.exports = (userLevel) => {
  switch (userLevel) {
    case 'Admin':
      return require('./menu/admin_menu')
    case 'Pemesanan':
      return require('./menu/pemesanan_menu')
    default:
      return require('./menu/pemesanan_menu')
  }
}