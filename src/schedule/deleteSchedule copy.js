$(document).ready(function () {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getProject/"+id,
    type: 'get',
    success: function (res) {
      $('#nama').text(res.nama_dies)
    }
  })
})

function hapus() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/delProject/"+id,
    type: 'delete',
    success: function (res) {
      alert('Data telah terhapus')
      tutupmodal()
    }
  })
}

function tutupmodal() {
	$('#scheduleModal').modal('hide')
  $('#delScheduleModal').modal('hide')
  refreshpage()
}