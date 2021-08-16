$(document).ready(function () {
  // let id = $('input[name=idS]').val();
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getUser/"+id,
    type: 'get',
    success: function (res) {
      $('#nama').text(res.nama)
    }
  })
})

function hapus() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/delUser/"+id,
    type: 'delete',
    success: function (res) {
      alert('Data telah terhapus')
      tutupmodal()
    }
  })
}

function tutupmodal() {
	$('#userModal').modal('hide')
  $('#delUserModal').modal('hide')
  refreshpage()
}