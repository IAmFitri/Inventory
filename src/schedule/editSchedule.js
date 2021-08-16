$(document).ready(function () {
  // let id = $('input[name=idS]').val();
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getProject/"+id,
    type: 'get',
    success: function (res) {
      $('#dies').val(res.nama_dies),
      $('#order').val(res.no_order),
      $('#part').val(res.nama_part),
      $('#type').val(res.type),
      $('#model').val(res.model),
      $('#process').val(res.process),
      $('#tglSelesai').val(res.tgl_target_finish)
    }
  })
})

function simpan() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/editProject/"+id,
    type: 'PUT',
    data: {
      "namaDies": $('#dies').val(),
      "order": $('#order').val(),
      "namaPart": $('#part').val(),
      "type": $('#type').val(),
      "model": $('#model').val(),
      "process": $('#process').val(),
      "tgl_finish": $('#tglSelesai').val()
    },
    success: function (res) {
      alert('Data berhasil disimpan')
      document.getElementById("editSchedule").reset()
      closemodal()
    }
  })
}

function cek() {
  if ($('#dies').val() == "") {
    $('#dies').addClass("border-danger")
  } else if ($('#order').val() == "") {
    $('#order').addClass("border-danger")
  } else if ($('#part').val() == "") {
    $('#part').addClass("border-danger")
  } else if ($('#type').val() == "") {
    $('#type').addClass("border-danger")
  } else if ($('#model').val() == "") {
    $('#model').addClass("border-danger")
  } else if ($('#process').val() == "") {
    $('#process').addClass("border-danger")
  } else if ($('#tglSelesai').val() == "") {
    $('#tglSelesai').addClass("border-danger")
  } else {
    $('#dies').removeClass("border-danger")
    $('#order').removeClass("border-danger")
    $('#part').removeClass("border-danger")
    $('#type').removeClass("border-danger")
    $('#model').removeClass("border-danger")
    $('#process').removeClass("border-danger")
    $('#tglSelesai').removeClass("border-danger")
    simpan()
  }
}

function closemodal() {
	$('#scheduleModal').modal('hide')
  $('#delScheduleModal').modal('hide')
  refreshpage()
}