$(document).ready(() => {
  const namaPenumpang = $('#nama-penumpang-group')

  $('#jumlah').change(() => {
    namaPenumpang.children().remove()
    const jumlah = $('#jumlah').val()

    if (jumlah > 7 || jumlah < 1) {
      return
    }

    for (let i = 1; i <= jumlah; i++) {
      const formGroup = $('<div>', { class: 'form-group' })
      formGroup.append($('<label>', { for: 'nama_penumpang' }).append(`Penumpang ke-${i}`))
      formGroup.append($('<input>', { class: 'nama_penumpang', name: 'nama_penumpang', type: 'text', id: `penumpang${i}` }))
      namaPenumpang.append(formGroup)
    }
  })

  $('#simpan').click(evt => {
    evt.preventDefault()

    const idJadwal = $('#jadwal')
    const namaPemesan = $('#nama_pemesan')
    const noTelp = $('#notelp')
    const tanggal = $('#tanggal')
    const jumlah = $('#jumlah')
    const harga = $('#harga')
    const namaPenumpang = []

    for (let i = 1; i <= jumlah.val(); i++) {
      if ($(`#penumpang${i}`).val() === '') {
        alert('Pastikan tidak ada yang masih kosong')
        return
      } 

      namaPenumpang.push($(`#penumpang${i}`).val())
    }

    if (namaPemesan.val() === '' || noTelp.val() === '' || tanggal.val() === '' || jumlah.val() === '') {
      alert('Pastikan tidak ada yang masih kosong')
      return
    }

    if (!confirm(`Total harga keseluruhan: ${harga.val() * jumlah.val()}`)) {
      return
    }

    $.ajax({
      url: `/pemesanan`,
      type: 'POST',
      data: {
        nama_pemesan: namaPemesan.val(),
        no_telepon: noTelp.val(),
        tanggal_keberangkatan: tanggal.val(),
        jumlah_tiket: jumlah.val(),
        harga_total: harga.val() * jumlah.val(),
        id_jadwal: idJadwal.val(),
        nama_penumpang: namaPenumpang
      },
      dataType: 'json',
      error: ajaxErrorHandler,
      success: response => {
        if (response.status === 200) {
          alert('Berhasil menambahkan pemesanan baru')
          window.location = '/pemesanan'
        }
      }
    })
  })
})