$(document).ready(function () {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getRak/"+id,
    type: 'get',
    success: function (res) {
      $('#nama').text(res.nama_electrude)
    }
  })
})

function hapus() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/delRak/"+id,
    type: 'delete',
    success: function (res) {
      alert('Data telah terhapus')
      tutupmodal()
    }
  })
}

function tutupmodal() {
	$('#rakModal').modal('hide')
  $('#delRakModal').modal('hide')
  refreshpage()
}