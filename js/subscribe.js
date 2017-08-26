$('#signupBtn').click(event => {
  const email = $('#inputEmail').val();

  $.ajax({
    url: `http://tiny.cc/cl-email-api-test/?email=${email}`,
    dataType: 'jsonp',
    jsonpCallback: 'jsonCallback',
  }).then(response => {
    const { message } = response;
    if (message.status_code === 200) {
      $('#successAlert').show()
    } else if (message.status_code === 400) {
      $('#failAlert').show()
    }
  }).catch(error => {
    console.log(error.status)
  });

  event.preventDefault();
});

$('.form-control').blur(function(event) {
  const $input = $(this);
  const $message = $(this).parent().next();

  if ($input.val() !== '') {
    $input.removeClass('is-invalid');
    $input.addClass('is-valid');
    $message.hide();
  } else {
    $input.removeClass('is-valid');
    $input.addClass('is-invalid');
    $message.show();
  }
  $('#signupBtn').prop('disabled', !validateForm())
});

const validateForm = () => (
  $('.form-control.is-valid').length === 3 ? true : false
);
