module.exports = (userLevel) => {
  switch (userLevel) {
    case 'Admin':
      return 'Pengolahan Data Master'
    case 'Pemesanan':
      return 'Pengolahan Data Pemesanan'
    default:
      return ''
  }
}