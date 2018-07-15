$(document).ready(() => {
  const bandaraAsal = $('#bandara_asal')
  const bandaraTujuan = $('#bandara_tujuan')
  const select = $('#jadwal')

  function requestDetail() {
    $.ajax({
      url: `/maskapai/jadwal/id/${select.val()}`,
      type: 'GET',
      dataType: 'json',
      error: ajaxErrorHandler,
      success: response => {
        $('#harga').html(response.harga)
      }
    })
  }

  function requestJadwal() {
    $.ajax({
      url: `/maskapai/jadwal/detail/${bandaraAsal.val()}/${bandaraTujuan.val()}`,
      type: 'GET',
      dataType: 'json',
      error: ajaxErrorHandler,
      success: response => {
        $('#jadwal option').remove()

        if (response.length > 0) {
          for (let jadwal of response) {
            const { nama_maskapai } = jadwal.maskapai
            const { kelas, jam_keberangkatan } = jadwal

            select.append($('<option>', { value: jadwal.id_jadwal })
                .append(`${nama_maskapai} - ${kelas} -  ${jam_keberangkatan}`))
          }
          requestDetail()
        } else {
          select.append($('<option>', { value: 0, disabled: true, selected: true }).append('Tidak ditemukan!'))
        }
      }
    })
  }

  requestJadwal()
  bandaraAsal.change(() => requestJadwal())
  bandaraTujuan.change(() => requestJadwal())
  select.change(() => requestDetail())

  $('#lanjut').click(evt => {
    evt.preventDefault()

    if (confirm('Apakah anda sudah yakin?')) {
      window.location = `/pemesanan/tambah/${select.val()}`
    }
  })
})