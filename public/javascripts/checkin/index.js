$(document).ready(() => {
  let ticketTotal = 0
  const group = $('#group')
  const gate = $('#gate')

  function requestPemesanan() {
    $.ajax({
      url: `/pemesanan/detail/${$('#pemesanan').val()}`,
      type: 'GET',
      dataType: 'json',
      error: ajaxErrorHandler,
      success: response => {
        $('#group *').remove()

        ticketTotal = response.jumlah_tiket

        for (let i = 0; i < response.jumlah_tiket; i++) {
          const formGroupPenumpang = $('<div>', { class: 'form-group' })
          formGroupPenumpang.append($('<label>', { for: `penumpang${i + 1}` }).append(`Penumpang ${i + 1}`))
          formGroupPenumpang.append($('<input>', { id: `penumpang${i + 1}`, type: 'text', name: `penumpang${i + 1}`, value: response.nama_penumpang[i].nama_penumpang, placeholder: 'John Doe' }))

          const formGroupSeat = $('<div>', { class: 'form-group' })
          formGroupSeat.append($('<label>', { for: `seat${i + 1}` }).append(`Seat ${i + 1}`))
          formGroupSeat.append($('<input>', { id: `seat${i + 1}`, type: 'text', name: `seat${i + 1}`, placeholder: 'A12', maxlength: 3 }))

          group.append(formGroupPenumpang)
          group.append(formGroupSeat)
        }
      }
    })
  }

  requestPemesanan()
  $('#pemesanan').change(() => requestPemesanan())

  $('#simpan').click(evt => {
    evt.preventDefault()

    if (gate.val() === '') {
      alert('Pastikan tidak ada yang masih kosong')
      return
    }

    for (let i = 1; i <= ticketTotal; i++) {
      if ($(`#penumpang${i}`).val() === '' || $(`#seat${i}`).val() === '' ) {
        alert('Pastikan tidak ada yang masih kosong')
        return
      }
    }

    for (let i = 1; i <= ticketTotal; i++) {
      $.ajax({
        url: `/checkin`,
        type: 'POST',
        data: {
          nama_penumpang: $(`#penumpang${i}`).val(),
          no_kursi: $(`#seat${i}`).val(),
          no_gerbang: gate.val(),
          id_pemesanan: $('#pemesanan').val()
        },
        dataType: 'json',
        error: ajaxErrorHandler,
        success: () => {}
      })
    }

    alert('Berhasil melakukan check in')
    window.location = '/'

  })
})