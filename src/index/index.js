/* $("#t1").append(" <li class=\"dropdown \" >");
  $("#t1").append(" <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\"> Menu 2");
  $("#t1").append("</li>"); */

// window.onunload = () => {
//   localStorage.clear()
// }

$( document ).ready(function() {
  $('#jabatanLog').val(localStorage.jabatan);
  if ($('#jabatanLog').val() == "") {
    alert("Silahkan Login Kembali")
    window.location = "login.html";
  }
});

$("#t1").append(" <li class=\"dropdown \" >" +
  " <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\"> Menu 2" +
  "</li>");

$('.list-group-item').on('click', function () {
  var url = $(this).attr('href');
  $.ajax({
    url: url,
    type: 'get',
    dataType: 'html',
    success: function (res) {
      if (url == "/") {
        window.location = '/';
      } else {
        $('#fragment').html(res);
      }
    }
  });
  return false;
});

$('.logout').on('click',function () {
  localStorage.clear();
});

function getId(t) {
	let id = t.getAttribute("value");
	$('#idS').val(id);
}