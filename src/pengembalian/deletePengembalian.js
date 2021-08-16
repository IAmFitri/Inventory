$(document).ready(function () {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getPengembalian/"+id,
    type: 'get',
    success: function (res) {
      $('#nama').text(res.nama_dies)
    }
  })
})

function hapus() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/delPengembalian/"+id,
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