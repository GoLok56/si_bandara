$(document).ready(() => {
  $('.delete').click(evt => {
    const target = $(evt.target)
    const targetId = target.parents('td').attr('id')

    if (confirm(`Apakah anda yakin ingin menghapus petugas dengan id ${targetId}`)) {
      $.ajax({
        url: '/petugas',
        type: 'DELETE',
        data: {
          id_petugas: targetId
        },
        dataType: 'json',
        error: ajaxErrorHandler,
        success: () => {
          alert("Berhasil menghapus petugas")
          target.parents('tr').remove()
        }
      })
    }
  })
})
