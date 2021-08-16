$(document).ready(function () {
  // let id = $('input[name=idS]').val();
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getUser/"+id,
    type: 'get',
    success: function (res) {
      $('#nik').val(res.nik),
      $('#nama').val(res.nama),
      $('#jabatan').val(res.jabatan),
      $('#user').val(res.username),
      $('#pass').val(res.password)
    }
  })
})

function simpan() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/editUser/"+id,
    type: 'PUT',
    data: {
      "nik": $('#nik').val(),
      "nama": $('#nama').val(),
      "jabatan": $('#jabatan').val(),
      "user": $('#user').val(),
      "pass": $('#pass').val()
    },
    success: function (res) {
      alert('Data berhasil disimpan')
      document.getElementById("editUser").reset()
      closemodal()
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

function closemodal() {
	$('#userModal').modal('hide')
  $('#delUserModal').modal('hide')
  refreshpage()
}