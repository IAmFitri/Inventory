$(document).ready(function () {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getElectrude/"+id,
    type: 'get',
    success: function (res) {
      $('#nama').text(res.nama_electrude)
    }
  })
})

function hapus() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/delElectrude/"+id,
    type: 'delete',
    success: function (res) {
      alert('Data telah terhapus')
      tutupmodal()
    }
  })
}

function tutupmodal() {
	$('#electrudeModal').modal('hide')
  $('#delElectrudeModal').modal('hide')
  refreshpage()
}