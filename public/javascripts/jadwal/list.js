$(document).ready(() => {
  function addClickListener() {
    $('.delete').click(evt => {
      const target = $(evt.target)
      const targetId = target.parents('td').attr('id')
  
      if (confirm(`Apakah anda yakin ingin menghapus jadwal dengan id ${targetId}`)) {
        $.ajax({
          url: '/maskapai/jadwal',
          type: 'DELETE',
          data: {
            id_jadwal: targetId
          },
          dataType: 'json',
          error: ajaxErrorHandler,
          success: () => {
            alert("Berhasil menghapus jadwal")
            requestJadwal()
          }
        })
      }
    })
  }

  function requestJadwal() {
    $.ajax({
      url: `/maskapai/jadwal/detail/${$('#maskapai').val()}`,
      type: 'GET',
      dataType: 'json',
      error: ajaxErrorHandler,
      success: response => {
        if (response.length > 0) {
          $('table').show()
          $('#not-found').hide()

          createDataBody(response)          
          addClickListener()
        } else {
          $('table').hide()
          $('#not-found').show()
        }
      }
    })
  }

  function createDataBody(data) {
    $('table .data-body').remove()
    for (let jadwal of data) {
      const dataBody = $('<tr>', { class: 'data-body' })
      dataBody.append($('<td>').append(jadwal.bandara_asal.nama_bandara))
      dataBody.append($('<td>').append(jadwal.bandara_tujuan.nama_bandara)) 
      dataBody.append($('<td>').append(jadwal.kelas))
      dataBody.append($('<td>').append(jadwal.jam_keberangkatan))
      dataBody.append($('<td>').append(jadwal.jam_sampai))
      dataBody.append($('<td>').append(jadwal.harga))

      const tdAksi = $('<td>', { id: jadwal.id_jadwal })
      tdAksi.append($('<a>', { class: 'btn btn-data accent-color', href: `/maskapai/jadwal/ubah/${jadwal.id_jadwal}` }).append('Ubah'))
      tdAksi.append($('<button>', { class: 'btn btn-data accent-color delete' }).append('Hapus'))
      dataBody.append(tdAksi)

      $('table').append(dataBody)
    }
  }

  requestJadwal()

  $('#maskapai').change(() => {
    requestJadwal()
  })
})