$(document).ready(() => {
  $('.delete').click(evt => {
    const target = $(evt.target)
    const targetId = target.parents('td').attr('id')

    if (confirm(`Apakah anda yakin ingin menghapus bandara dengan id ${targetId}`)) {
      $.ajax({
        url: '/bandara',
        type: 'DELETE',
        data: {
          kode_bandara: targetId
        },
        dataType: 'json',
        error: ajaxErrorHandler,
        success: () => {
          alert("Berhasil menghapus bandara")
          target.parents('tr').remove()
        }
      })
    }
  })
})
