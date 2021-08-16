rakList();

function rakList() {
	$.ajax({
		url : 'http://localhost:5000/allRak',
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
						<td>Last Update</td>
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
					<td>${res[i].last_update}</td>
					<td>${res[i].no_rak_electrude}</td>
					<td>${res[i].penanggung_jawab}</td>
					<td>
						<div class="btn-group">
							<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" value="${res[i].id}" onclick="getId(this)">
								More<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="editRak()">Edit</button></a></li>
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="deleteRak()">Hapus</button></a></li>
							</ul>
						</div>
					</td>
				</tr>`
			}
			str+=`</tbody></table>`;
			$('#rakList').empty();
			$('#rakList').append(str);
		// $('#userList').html(res);	
		}
	});
}

function addform() {
	$.ajax({
		url : '/src/rak/addRak.html',
		type : 'get',
		dataType : 'html',
    success: function (res) {
      console.log(res);
			$('#rakModal').modal('show');
			$('#nonRakList').html(res);
			$('#judul').html("Add Data Rak Electrude");
		}
	});
}

function getId(t) {
	let id = t.getAttribute("value");
	$('#idS').val(id);
}

function editRak() {
	$.ajax({
		url : '/src/rak/editRak.html',
		type : 'get',
		dataType : 'html',
		success : function(res) {
			$('#rakModal').modal('show');
			$('#nonRakList').html(res);
			$('#judul').html("Edit Data Rak Electrude");
		}
	});
}

function deleteRak() {
  $.ajax({
		url : '/src/rak/deleteRak.html',
		type : 'get',
		dataType : 'html',
		success: function (res) {
			$('#delRakModal').modal('show')
			$('#delRakList').html(res)
		}
	});
}

function closemodal() {
	$('#rakModal').modal('hide')
	$('#delRakModal').modal('hide')
	rakList()
}

function refreshpage(){
	$.ajax({
		url : '/src/rak/rak.html',
		type : 'get',
		dataType : 'html',
		success : function(result) {
			closemodal();
			$('#fragment').html(result);
		}
	});
	return false;
}