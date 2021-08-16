$('.penggunaan-list').on('click', function () {
  var url = $(this).attr('href');
  $.ajax({
    url: url,
    type: 'get',
    dataType: 'html',
    success: function (res) {
      if (url == "/") {
        window.location = '/';
      } else {
        $('#penggunaanData').html(res);
      }
    }
  });
  return false;
});

function closemodal() {
	$('#penggunaanModal').modal('hide')
	$('#delPenggunaanModal').modal('hide')
}

function refreshpage(){
	$.ajax({
		url : '/src/penggunaan/penggunaan.html',
		type : 'get',
		dataType : 'html',
		success : function(result) {
			closemodal();
			$('#fragment').html(result)
		}
	});
	return false;
}