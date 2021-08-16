$(document).ready(function () {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getPengembalian/"+id,
    type: 'get',
    success: function (res) {
      $('#dies').val(res.nama_dies),
      $('#order').val(res.no_order),
      $('#electrude').val(res.nama_electrude),
      $('#type').val(res.type),
      $('#model').val(res.model),
      $('#tglPengembalian').val(res.tgl_pengembalian),
      $('#rak').val(res.no_rak),
      $('#penanggung').val(res.penanggung_jawab) 
    }
  })
})

function simpan() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/editPengembalian/"+id,
    type: 'PUT',
    data: {
      "namaDies": $('#dies').val(),
      "order": $('#order').val(),
      "namaElectrude": $('#electrude').val(),
      "type": $('#type').val(),
      "model": $('#model').val(),
      "tglPengembalian": $('#tglPengembalian').val(),
      "no_rak": $('#rak').val(),
      "penanggung": $('#penanggung').val()
    },
    success: function (res) {
      alert('Data berhasil disimpan')
      document.getElementById("editPengembalian").reset()
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

function closemodal() {
	$('#penggunaanModal').modal('hide')
  $('#delPenggunaanModal').modal('hide')
  refreshpage()
}