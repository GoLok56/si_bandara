$(document).ready(() => {
  $('.delete').click(evt => {
    const target = $(evt.target)
    const targetId = target.parents('td').attr('id')

    if (confirm(`Apakah anda yakin ingin menghapus maskapai dengan id ${targetId}`)) {
      $.ajax({
        url: '/maskapai',
        type: 'DELETE',
        data: {
          kode_maskapai: targetId
        },
        dataType: 'json',
        error: ajaxErrorHandler,
        success: () => {
          alert("Berhasil menghapus maskapai")
          target.parents('tr').remove()
        }
      })
    }
  })
})
