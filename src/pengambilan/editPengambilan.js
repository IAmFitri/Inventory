$(document).ready(function () {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/getPengambilan/"+id,
    type: 'get',
    success: function (res) {
      $('#dies').val(res.nama_dies),
      $('#order').val(res.no_order),
      $('#electrude').val(res.nama_electrude),
      $('#type').val(res.type),
      $('#model').val(res.model),
      $('#tglPengambilan').val(res.tgl_pengambilan),
      $('#rak').val(res.no_rak),
      $('#penanggung').val(res.penanggung_jawab) 
    }
  })
})

function simpan() {
  let id = $('#idS').val()
  $.ajax({
    url: "http://localhost:5000/editPengambilan/"+id,
    type: 'PUT',
    data: {
      "namaDies": $('#dies').val(),
      "order": $('#order').val(),
      "namaElectrude": $('#electrude').val(),
      "type": $('#type').val(),
      "model": $('#model').val(),
      "tglPengambilan": $('#tglPengambilan').val(),
      "no_rak": $('#rak').val(),
      "penanggung": $('#penanggung').val()
    },
    success: function (res) {
      alert('Data berhasil disimpan')
      document.getElementById("editPengambilan").reset()
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
  } else if ($('#tglPengambilan').val() == "") {
    $('#tglPengambilan').addClass("border-danger")
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
    $('#tglPengambilan').removeClass("border-danger")
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