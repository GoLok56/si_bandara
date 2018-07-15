$(document).ready(() => {
  $('#simpan').click(evt => {
    evt.preventDefault()

    const name = $('#nama')
    const kode = $('#kode')

    if (name.val() === '' || kode.val() === '') {
      alert('Pastikan tidak ada yang masih kosong')
      return
    }
    
    $.ajax({
      url: '/maskapai/tambah',
      type: 'POST',
      data: {
        kode_maskapai: kode.val(),
        nama_maskapai: name.val() 
      },
      dataType: 'json',
      error: ajaxErrorHandler,
      success: () => {
        alert("Berhasil melakukan penambahan maskapai baru")
        name.val('')
        kode.val('')
      }
    })
  })
})