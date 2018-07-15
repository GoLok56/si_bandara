$(document).ready(() => {
  $('#simpan').click(evt => {
    evt.preventDefault()

    const tanggal = $('#tanggal')
    const idJadwal = $('#jadwal')
    const idPemesanan = $('#id_pemesanan')

    if (tanggal.val() === '') {
      alert('Pastikan tidak ada yang masih kosong')
      return
    }

    $.ajax({
      url: '/pemesanan/reschedule',
      type: 'POST',
      data: {
        id_pemesanan: idPemesanan.val(),
        tanggal_keberangkatan: tanggal.val(),
        id_jadwal: idJadwal.val()
      },
      dataType: 'json',
      error: ajaxErrorHandler,
      success: response => {
        if (response.status === 200) {
          alert('Berhasil mengubah jadwal pemesanan')
          window.location = '/pemesanan'
        }
      }
    })
  }) 
})