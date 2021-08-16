$(document).ready(function () {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getElectrude/"+id,
    type: 'get',
    success: function (res) {
      $('#dies').val(res.nama_dies),
      $('#order').val(res.no_order),
      $('#electrude').val(res.nama_electrude),
      $('#type').val(res.type),
      $('#model').val(res.model),
      $('#tglSimpan').val(res.tgl_disimpan_rak),
      $('#rak').val(res.no_rak)
    }
  })
})

function simpan() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/editElectrude/"+id,
    type: 'PUT',
    data: {
      "namaDies": $('#dies').val(),
      "order": $('#order').val(),
      "namaElectrude": $('#electrude').val(),
      "type": $('#type').val(),
      "model": $('#model').val(),
      "tglSimpan": $('#tglSimpan').val(),
      "no_rak": $('#rak').val()
    },
    success: function (res) {
      alert('Data berhasil disimpan')
      document.getElementById("editElectrude").reset()
      closemodal()
    }
  })
}

function cek() {
  if ($('#dies').val() == "") {
    $('#dies').addClass("border-danger")
  } else if ($('#order').val() == "") {
    $('#order').addClass("border-danger")
  } else if ($('#electrude').val() == "") {
    $('#electrude').addClass("border-danger")
  } else if ($('#type').val() == "") {
    $('#type').addClass("border-danger")
  } else if ($('#model').val() == "") {
    $('#model').addClass("border-danger")
  } else if ($('#update').val() == "") {
    $('#tglSimpan').addClass("border-danger")
  }  else if ($('#rak').val() == "") {
    $('#rak').addClass("border-danger")
  } else {
    $('#dies').removeClass("border-danger")
    $('#order').removeClass("border-danger")
    $('#electrude').removeClass("border-danger")
    $('#type').removeClass("border-danger")
    $('#model').removeClass("border-danger")
    $('#tglSimpan').removeClass("border-danger")
    $('#rak').removeClass("border-danger")
    simpan()
  }
}

function closemodal() {
	$('#electrudeModal').modal('hide')
  $('#delElectrudeModal').modal('hide')
  refreshpage()
}