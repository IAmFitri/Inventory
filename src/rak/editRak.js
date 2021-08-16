$(document).ready(function () {
  // let id = $('input[name=idS]').val();
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getRak/"+id,
    type: 'get',
    success: function (res) {
      $('#dies').val(res.nama_dies),
      $('#order').val(res.no_order),
      $('#electrude').val(res.nama_electrude),
      $('#type').val(res.type),
      $('#model').val(res.model),
      $('#penanggung').val(res.penanggung_jawab),
      $('#rak').val(res.no_rak_electrude),
      $('#update').val(res.last_update)
    }
  })
})

function simpan() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/editRak/"+id,
    type: 'PUT',
    data: {
      "namaDies": $('#dies').val(),
      "order": $('#order').val(),
      "namaElectrude": $('#electrude').val(),
      "type": $('#type').val(),
      "model": $('#model').val(),
      "penanggung": $('#penanggung').val(),
      "no_rak": $('#rak').val(),
      "update": $('#update').val()
    },
    success: function (res) {
      alert('Data berhasil disimpan')
      document.getElementById("editRak").reset()
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
  }else if ($('#model').val() == "") {
    $('#model').addClass("border-danger")
  } else if ($('#update').val() == "") {
    $('#update').addClass("border-danger")
  }  else if ($('#rak').val() == "") {
    $('#rak').addClass("border-danger")
  } else if ($('#penanggung').val() == "") {
    $('#penanggung').addClass("border-danger")
  } else {
    $('#dies').removeClass("border-danger")
    $('#order').removeClass("border-danger")
    $('#electrude').removeClass("border-danger")
    $('#type').removeClass("border-danger")
    $('#model').removeClass("border-danger")
    $('#update').removeClass("border-danger")
    $('#rak').removeClass("border-danger")
    $('#penanggung').removeClass("border-danger")
    simpan()
  }
}

function closemodal() {
	$('#rakModal').modal('hide')
  $('#delRakModal').modal('hide')
  refreshpage()
}