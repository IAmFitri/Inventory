electrudeList();

function electrudeList() {
	$.ajax({
		url : 'http://localhost:5000/allElectrude',
		type : 'get',
		success : function(res) {
			let str = `
			<input type="hidden" id="idS">
      <table class='table table-bordered table-striped'>
        <thead>
          <tr>
						<td>Nama Dies</td>
						<td>No Order</td>
						<td>Nama Electrude</td>
						<td>Type</td>
						<td>Model</td>
						<td>Tanggal Disimpan di Rak</td>
						<td>No Rak</td>
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
					<td>${res[i].tgl_disimpan_rak}</td>
					<td>${res[i].no_rak}</td>
					<td>
						<div class="btn-group">
							<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" value="${res[i].id}" onclick="getId(this)">
								More<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="editElectrude()">Edit</button></a></li>
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="deleteElectrude()">Hapus</button></a></li>
							</ul>
						</div>
					</td>
				</tr>`
			}
			str+=`</tbody></table>`;
			$('#electrudeList').empty();
			$('#electrudeList').append(str);
		}
	});
}

function addform() {
	$.ajax({
		url : '/src/electrude/addElectrude.html',
		type : 'get',
		dataType : 'html',
    success: function (res) {
      console.log(res);
			$('#electrudeModal').modal('show');
			$('#nonElectrudeList').html(res);
			$('#judul').html("Add Data Electrude");
		}
	});
}

function getId(t) {
	let id = t.getAttribute("value");
	$('#idS').val(id);
}

function editElectrude() {
	$.ajax({
		url : '/src/electrude/editElectrude.html',
		type : 'get',
		dataType : 'html',
		success : function(res) {
			$('#electrudeModal').modal('show');
			$('#nonElectrudeList').html(res);
			$('#judul').html("Edit Data Electrude");
		}
	});
}

function deleteElectrude() {
  $.ajax({
		url : '/src/electrude/deleteElectrude.html',
		type : 'get',
		dataType : 'html',
		success: function (res) {
			$('#delElectrudeModal').modal('show')
			$('#delElectrudeList').html(res)
		}
	});
}

function closemodal() {
	$('#electrudeModal').modal('hide')
	$('#delElectrudeModal').modal('hide')
	electrudeList()
}

function refreshpage(){
	$.ajax({
		url : '/src/electrude/electrude.html',
		type : 'get',
		dataType : 'html',
		success : function(result) {
			closemodal();
			$('#fragment').html(result);
		}
	});
	return false;
}