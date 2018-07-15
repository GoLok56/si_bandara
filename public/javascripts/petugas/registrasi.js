$(document).ready(() => {
  $('#simpan').click(evt => {
    evt.preventDefault()

    const username = $('#username')
    const password = $('#password')
    const nama_petugas = $('#nama')
    const jenis_petugas = $('#jenis_petugas')

    if (username.val() === '' || password.val() === '' || nama_petugas.val() === '') {
      alert('Pastikan tidak ada yang masih kosong')
      return
    }

    $.ajax({
      url: '/petugas/tambah',
      type: 'POST',
      data: {
        username: username.val(), 
        password: password.val(), 
        nama_petugas: nama_petugas.val(), 
        jenis_petugas: jenis_petugas.val()
      },
      dataType: 'json',
      error: ajaxErrorHandler,
      success: () => {
        alert("Berhasil melakukan registrasi petugas baru")
        username.val('')
        password.val('')
        nama_petugas.val('')
        jenis_petugas.val('Admin')
      }
    })
  })
})