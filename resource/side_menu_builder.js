module.exports = section => {
  switch (section) {
    case 'Petugas':
      return require('./side_menu/petugas_menu')
    case 'Maskapai': 
      return require('./side_menu/maskapai_menu')
    case 'Bandara':
      return require('./side_menu/bandara_menu')
    default: 
      return require('./side_menu/petugas_menu')
  }
}