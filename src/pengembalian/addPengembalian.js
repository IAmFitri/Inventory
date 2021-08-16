function simpan() {
  $.ajax({
    url: "http://localhost:5000/addPengembalian",
    type: 'POST',
    data: {
      "nama_dies": $('#dies').val(),
      "no_order": $('#order').val(),
      "nama_electrude": $('#electrude').val(),
      "type": $('#type').val(),
      "model": $('#model').val(),
      "tgl_pengembalian": $('#tglPengembalian').val(),
      "no_rak": $('#rak').val(),
      "penanggung_jawab": $('#penanggung').val()
    },
    success: function (res) {
      alert('Data berhasil ditambahkan')
      document.getElementById("addPengembalian").reset()
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
  } else if ($('#tglPengembalian').val() == "") {
    $('#tglPengembalian').addClass("border-danger")
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
    $('#tglPengembalian').removeClass("border-danger")
    $('#rak').removeClass("border-danger")
    $('#penanggung').removeClass("border-danger")
    simpan()
  }
}