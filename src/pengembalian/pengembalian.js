pengembalianList();

function pengembalianList() {
	$.ajax({
		url : 'http://localhost:5000/allPengembalian',
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
            <td>Target Pengembalian</td>
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
					<td>${res[i].tgl_pengembalian}</td>
					<td>${res[i].no_rak}</td>
					<td>${res[i].penanggung_jawab}</td>
					<td>
						<div class="btn-group">
							<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" value="${res[i].id}" onclick="getId(this)">
								More<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="editBalik()">Edit</button></a></li>
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="deletePengembalian()">Hapus</button></a></li>
							</ul>
						</div>
					</td>
					</tr>`
      }
			str += `</tbody></table>`;
				$('#pengembalianList').empty();
				$('#pengembalianList').append(str);
		}
	});
}

function addBalik() {
	$.ajax({
		url : '/src/pengembalian/addPengembalian.html',
		type : 'get',
		dataType : 'html',
    success: function (res) {
			$('#penggunaanModal').modal('show');
			$('#nonPenggunaanList').html(res);
			$('#judul').html("Add Data Pengembalian");
		}
	});
}

function getId(t) {
	let id = t.getAttribute("value");
	$('#idS').val(id);
}

function editBalik() {
	$.ajax({
		url : '/src/pengembalian/editPengembalian.html',
		type : 'get',
		dataType : 'html',
		success : function(res) {
			$('#penggunaanModal').modal('show');
			$('#nonPenggunaanList').html(res);
			$('#judul').html("Edit Data Pengembalian");
		}
	});
}

function deletePengembalian() {
  $.ajax({
		url : '/src/pengembalian/deletePengembalian.html',
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
  pengembalianList()
}

function refreshpage(){
	$.ajax({
		url : '/src/pengembalian/pengembalian.html',
		type : 'get',
		dataType : 'html',
		success : function(result) {
			closemodal();
			$('#penggunaanData').html(result)
		}
	});
	return false;
}