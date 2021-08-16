$(document).ready(function () {
  console.log(localStorage.jabatan)
  localStorage.clear()
})
function auth() {
  $.ajax({
    url: "http://localhost:5000/userLogin",
    type: 'POST',
    data: {
      "user": $('#user').val(),
      "pass": $('#pass').val()
    },
    success: function (res) {
      // console.log(res)
      // res = JSON.stringify(res)
      // console.log(res)
      // alert(res.length)
      if (res.length !== 0) {
        const user = res.username,
          jabatan = res.jabatan,
          // url = 'http://127.0.0.1:5500/index.html?user=' + encodeURIComponent(user)+'&jabatan='+ encodeURIComponent(jabatan);
          url = 'index.html'
        // document.location.href = url;
        window.location = url;
        localStorage.user = user;
        localStorage.jabatan = jabatan;
      } else {
        alert("Username or Password is Wrong")
      }
    }
  })
}