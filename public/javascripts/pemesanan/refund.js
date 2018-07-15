$(document).ready(() => {
  function requestPemesanan() {
    $.ajax({
      url: `/pemesanan/detail/${$('#pemesanan').val()}`,
      type: 'GET',
      dataType: 'json',
      error: ajaxErrorHandler,
      success: response => {
        const total = response.harga_total
        const potongan = .25 * total

        $('#harga').html(total)
        $('#refund').html(total - potongan)
      }
    })
  }

  requestPemesanan()
  $('#pemesanan').change(() => requestPemesanan())

  $('#refund-btn').click(evt => {
    evt.preventDefault()

    $.ajax({
      url: '/pemesanan/reschedule',
      type: 'POST',
      data: {
        id_pemesanan: $('#pemesanan').val(),
        status_refund: 1
      },
      dataType: 'json',
      error: ajaxErrorHandler,
      success: response => {
        if (response.status === 200) {
          alert('Berhasil melakukan refund')
          window.location = '/pemesanan'
        }
      }
    })
  })
})