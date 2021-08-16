$(document).ready(function () {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getPengambilan/"+id,
    type: 'get',
    success: function (res) {
      $('#nama').text(res.nama_dies)
    }
  })
})

function hapus() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/delPengambilan/"+id,
    type: 'delete',
    success: function (res) {
      alert('Data telah terhapus')
      tutupmodal()
    }
  })
}

function tutupmodal() {
	$('#penggunaanModal').modal('hide')
  $('#delPenggunaanModal').modal('hide')
  refreshpage()
}