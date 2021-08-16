pengambilanList();

function pengambilanList() {
	$.ajax({
		url : 'http://localhost:5000/allPengambilan',
		type : 'get',
		success : function(res) {
			let str = `
      <table class='table table-bordered table-striped'>
        <thead>
          <tr>
            <td>Nama Dies</td>
            <td>No Order</td>
            <td>Nama Electrude</td>
						<td>Type</td>
            <td>Model</td>
            <td>Target Pengambilan</td>
						<td>No Rak</td>
						<td>Penanggung Jawab</td>
						<td>Aksi</td>
          </tr>
        </thead>
        <tbody>`
      for(i=0;i<res.length;i++){
				str += `
				<tr>
					<td>${res[i].nama_dies}</td>
					<td>${res[i].no_order}</td>
					<td>${res[i].nama_electrude}</td>
					<td>${res[i].type}</td>
					<td>${res[i].model}</td>
					<td>${res[i].tgl_pengambilan}</td>
					<td>${res[i].no_rak}</td>
					<td>${res[i].penanggung_jawab}</td>
					<td>
						<div class="btn-group">
							<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" value="${res[i].id}" onclick="getId(this)">
								More<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="editAmbil()">Edit</button></a></li>
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="deletePengambilan()">Hapus</button></a></li>
							</ul>
						</div>
					</td>
					</tr>`
      }
			str += `</tbody></table>`;
				$('#pengambilanList').empty();
				$('#pengambilanList').append(str);
		}
	});
}

function addPengambilan() {
	$.ajax({
		url : '/src/pengambilan/addPengambilan.html',
		type : 'get',
		dataType : 'html',
    success: function (res) {
      console.log(res);
			$('#penggunaanModal').modal('show');
			$('#nonPenggunaanList').html(res);
			$('#judul').html("Add Data Pengambilan");
		}
	});
}

function getId(t) {
	let id = t.getAttribute("value");
	$('#idS').val(id);
}

function editAmbil() {
	$.ajax({
		url : '/src/pengambilan/editPengambilan.html',
		type : 'get',
		dataType : 'html',
		success : function(res) {
			$('#penggunaanModal').modal('show');
			$('#nonPenggunaanList').html(res);
			$('#judul').html("Edit Data Pengambilan");
		}
	});
}

function deletePengambilan() {
  $.ajax({
		url : '/src/pengambilan/deletePengambilan.html',
		type : 'get',
		dataType : 'html',
		success: function (res) {
			$('#delPenggunaanModal').modal('show')
			$('#delPenggunaanList').html(res)
		}
	});
}

function closemodal() {
	$('#penggunaanModal').modal('hide')
  $('#delPenggunaanModal').modal('hide')
  pengambilanList()
}

function refreshpage(){
	$.ajax({
		url : '/src/pengambilan/pengambilan.html',
		type : 'get',
		dataType : 'html',
		success : function(result) {
			closemodal();
			$('#penggunaanData').html(result)
		}
	});
	return false;
}