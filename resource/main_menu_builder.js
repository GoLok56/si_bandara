module.exports = (userLevel) => {
  switch (userLevel) {
    case 'Admin':
      return require('./main_menu/admin_menu')
    default:
      return require('./main_menu/admin_menu')
  }
}