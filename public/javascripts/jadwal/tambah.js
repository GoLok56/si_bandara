$(document).ready(() => {
  $('#simpan').click(evt => {
    evt.preventDefault()

    const maskapai = $('#maskapai')
    const bandara_asal = $('#bandara_asal')
    const bandara_tujuan = $('#bandara_tujuan')
    const kode = $('#kode')
    const jam_berangkat = $('#jam_berangkat')
    const jam_sampai = $('#jam_sampai')
    const harga = $('#harga')
    const kelas = $('#kelas')

    if (kode.val() === '' || jam_berangkat.val() === '' || jam_sampai.val() === '' || harga.val() === '') {
      alert('Pastikan tidak ada yang masih kosong')
      return
    }
    
    $.ajax({
      url: '/maskapai/jadwal/tambah',
      type: 'POST',
      data: {
        kode_penerbangan: kode.val(),
        jam_keberangkatan: jam_berangkat.val(),
        jam_sampai: jam_sampai.val(),
        harga: harga.val(),
        kode_bandara_asal: bandara_asal.val(),
        kode_bandara_tujuan: bandara_tujuan.val(),
        kode_maskapai: maskapai.val(),
        kelas: kelas.val()
      },
      dataType: 'json',
      error: ajaxErrorHandler,
      success: () => {
        alert("Berhasil melakukan penambahan jadwal baru")
        kode.val('')
        jam_berangkat.val('')
        jam_sampai.val('')
        harga.val('')
      }
    })
  })
})