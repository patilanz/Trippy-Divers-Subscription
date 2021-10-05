function onloadRecaptcha() {
  grecaptcha.render('myRecaptchaElement', {
    'sitekey': '6LcASpscAAAAANAvyFr6WDWh694qN4vJkh09mrbn',
    'size': 'invisible',
    'error-callback': function (error) {
      console.log(error);
    }
  });
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const sendNotification = async e => {
  const email = document.querySelector('#email_input').value;
  if (!validateEmail(email)) return alert('Email inválido');

  const response = await fetch('/ab', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  });
  const content = await response.json();

  console.log(content);
  alert('Gracias ! Le notificaremos ');
  document.querySelector('#email_box').style.display = 'none';
  /*

  grecaptcha.ready(function() {
    grecaptcha.execute('6LgjH2m5c8emE66pjdExmgep47BAdKTrCJ7KC1_W', {action: 'email'}).then(function (token) {
      alert(token);




    });
  });
  */

}
// 6LgjH2m5c8emE66pjdExmgep47BAdKTrCJ7KC1_W
//secret: 6LgjH2m5c8emE66pjdExmgep47BAdKTrCJ7cybqt
