$(document).ready(() => {
  $('#login').click(evt => {
    const username = $('#username')
    const password = $('#password')

    if (username.val() === '' || password.val() === '') {
      alert('Pastikan tidak ada yang masih kosong')
      return
    }

    evt.preventDefault()

    $.ajax({
      url: '/login',
      type: 'POST',
      data: {
        username: username.val(), 
        password: password.val()
      },
      dataType: 'json',
      error: ajaxErrorHandler,
      success: response => {
        if (response.status === 200) {
          window.location = '/'
        } else {
          alert(response.message)
        }
      }
    });
  })
})