$(document).ready(() => {
  $('#simpan').click(evt => {
    evt.preventDefault()

    const name = $('#nama')
    const kota = $('#kota')

    if (name.val() === '' || kota.val() === '') {
      alert('Pastikan tidak ada yang masih kosong')
      return
    }
    
    $.ajax({
      url: '/bandara/tambah',
      type: 'POST',
      data: {
        nama_bandara: name.val(),
        kota: kota.val()
      },
      dataType: 'json',
      error: ajaxErrorHandler,
      success: () => {
        alert("Berhasil melakukan penambahan bandara baru")
        name.val('')
        kota.val('')
      }
    })
  })
})