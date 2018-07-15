$(document).ready(() => {
  $('#simpan').click(evt => {
    const name = $('#nama')
    const kode = $('#kode')

    if (name === '' || kode === '') {
      alert('Pastikan tidak ada yang masih kosong')
      return
    }

    evt.preventDefault()
    
    $.ajax({
      url: '/maskapai/ubah',
      type: 'POST',
      data: {
        kode_maskapai: kode.val(),
        nama_maskapai: name.val(), 
        kode_maskapai_lama: $('#kode_maskapai_lama').val() 
      },
      dataType: 'json',
      error: ajaxErrorHandler,
      success: () => {
        alert("Berhasil melakukan perubahan")
        window.location = '/maskapai'
      }
    })
  })
})