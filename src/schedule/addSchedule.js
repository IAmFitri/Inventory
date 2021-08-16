function simpan() {
  $.ajax({
    url: "http://localhost:5000/addProject",
    type: 'POST',
    data: {
      "nama_dies": $('#dies').val(),
      "no_order": $('#order').val(),
      "nama_part": $('#part').val(),
      "type": $('#type').val(),
      "model": $('#model').val(),
      "process": $('#process').val(),
      "tgl_target_finish": $('#tglSelesai').val()
    },
    success: function (res) {
      alert('Data berhasil ditambahkan')
      document.getElementById("addSchedule").reset()
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