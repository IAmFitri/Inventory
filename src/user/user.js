userList();

function userList() {
	$.ajax({
		url : 'http://localhost:5000/allUser',
		type : 'get',
		success : function(res) {
			let str = `
			<input type="hidden" id="idS">
      <table class='table table-bordered table-striped'>
        <thead>
          <tr>
            <td>NIK</td>
            <td>Nama</td>
            <td>Jabatan</td>
            <td>Username</td>
            <td>Password</td>
						<td>Aksi</td>
          </tr>
        </thead>
        <tbody>`
      for(i=0;i<res.length;i++){
				str += `
				<tr>
					<td>${res[i].nik}</td>
					<td>${res[i].nama}</td>
					<td>${res[i].jabatan}</td>
					<td>${res[i].username}</td>
					<td>${res[i].password}</td>
					<td>
						<div class="btn-group">
							<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" value="${res[i].id}" onclick="getId(this)">
								More<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="editUser()">Edit</button></a></li>
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="deleteUser()">Hapus</button></a></li>
							</ul>
						</div>
					</td>
				</tr>`
      }
      str+=`</tbody></table>`;
				$('#userList').empty();
				$('#userList').append(str);
		}
	});
}

function addform() {
	$.ajax({
		url : '/src/user/addUser.html',
		type : 'get',
		dataType : 'html',
    success: function (res) {
			$('#userModal').modal('show');
			$('#nonUserList').html(res);
			$('#judul').html("Add User");
		}
	});
}

function getId(t) {
	let id = t.getAttribute("value");
	$('#idS').val(id);
}

function editUser() {
  $.ajax({
		url : '/src/user/editUser.html',
		type : 'get',
		dataType : 'html',
    success: function (res) {
			$('#userModal').modal('show')
			$('#nonUserList').html(res)
			$('#judul').html("Edit User")
		}
	});
}

function deleteUser() {
  $.ajax({
		url : '/src/user/deleteUser.html',
		type : 'get',
		dataType : 'html',
		success: function (res) {
			$('#delUserModal').modal('show')
			$('#delUserList').html(res)
		}
	});
}

function closemodal(){
	$('#userModal').modal('hide')
	$('#delUserModal').modal('hide')
	userList()
	// $('.modal-backdrop').hide();
	// $('.modal-backdrop').remove();
}

function refreshpage(){
	$.ajax({
		url : '/src/user/user.html',
		type : 'get',
		dataType : 'html',
		success : function(result) {
			closemodal();
			$('#fragment').html(result);
		}
	});
	return false;
}