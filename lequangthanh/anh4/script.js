const form = document.querySelector('form');
form.addEventListener('submit', (event) => {

  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;


  if (username.trim() === '' || password.trim() === '') {
    alert('Vui lòng nhập đầy đủ thông tin.');
    return;
  }

  if (password.length < 6) {
    alert('Mật khẩu phải có ít nhất 6 ký tự.');
    return;
  }

  form.submit();
});
