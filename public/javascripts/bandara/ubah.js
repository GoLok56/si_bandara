$(document).ready(() => {
  $('#simpan').click(evt => {
    const name = $('#nama')
    const kode = $('#kode_bandara')
    const kota = $('#kota')

    if (name.val() === '' || kota.val() === '') {
      alert('Pastikan tidak ada yang masih kosong')
      return
    }

    evt.preventDefault()
    
    $.ajax({
      url: '/bandara/ubah',
      type: 'POST',
      data: {
        kode_bandara: kode.val(),
        nama_bandara: name.val(),
        kota: kota.val()
      },
      dataType: 'json',
      error: ajaxErrorHandler,
      success: () => {
        alert("Berhasil melakukan perubahan")
        window.location = '/bandara'
      }
    })
  })
})