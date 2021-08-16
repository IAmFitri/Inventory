function simpan() {
  $.ajax({
    url: "http://localhost:5000/addUser",
    type: 'POST',
    data: {
      "nik": $('#nik').val(),
      "nama": $('#nama').val(),
      "jabatan": $('#jabatan').val(),
      "username": $('#user').val(),
      "password": $('#pass').val()
    },
    success: function (res) {
      alert('Data berhasil ditambahkan')
      document.getElementById("addUser").reset()
      if (localStorage == undefined) {
        const url = 'login.html'
        window.location = url;
      } else {
        tutupmodal()
      }
    }
  })
}

function cek() {
  if ($('#nik').val() == "") {
    $('#nik').addClass("border-danger")
  } else if ($('#nama').val() == "") {
    $('#nama').addClass("border-danger")
  } else if ($('#jabatan').val() == "") {
    $('#jabatan').addClass("border-danger")
  } else if ($('#user').val() == "") {
    $('#user').addClass("border-danger")
  } else if ($('#pass').val() == "") {
    $('#pass').addClass("border-danger")
  } else {
    $('#nik').removeClass("border-danger")
    $('#nama').removeClass("border-danger")
    $('#jabatan').removeClass("border-danger")
    $('#user').removeClass("border-danger")
    $('#pass').removeClass("border-danger")
    simpan()
  }
}

function tutupmodal() {
	$('#userModal').modal('hide')
  $('#delUserModal').modal('hide')
  userList()
}