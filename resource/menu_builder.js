module.exports = (userLevel) => {
  switch (userLevel) {
    case 'Admin':
      return require('./menu/admin_menu')
    default:
      return require('./menu/admin_menu')
  }
}