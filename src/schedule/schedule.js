scheduleList();

function scheduleList() {
	$.ajax({
		url : 'http://localhost:5000/allProject',
		type : 'get',
		success : function(res) {
			let str = `
			<input type="hidden" id="idS">
      <table class='table table-bordered table-striped'>
        <thead>
          <tr>
            <td>Nama Dies</td>
            <td>No Order</td>
            <td>Nama Part</td>
						<td>Type</td>
            <td>Model</td>
            <td>Process</td>
            <td>Target Finish</td>
						<td>Aksi</td>
          </tr>
        </thead>
        <tbody>`
      for(i=0;i<res.length;i++){
				str += `
				<tr>
					<td>${res[i].nama_dies}</td>
					<td>${res[i].no_order}</td>
					<td>${res[i].nama_part}</td>
					<td>${res[i].type}</td>
					<td>${res[i].model}</td>
					<td>${res[i].process}</td>
					<td>${res[i].tgl_target_finish}</td>
					<td>
						<div class="btn-group">
							<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" value="${res[i].id}" onclick="getId(this)">
								More<span class="caret"></span>
							</button>
							<ul class="dropdown-menu">
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="editSchedule()">Edit</button></a></li>
								<li><a><button style="text-align:left; background:none; border:none; width:100%;" onclick="deleteSchedule()">Hapus</button></a></li>
							</ul>
						</div>
					</td>
					</tr>`
      }
			str += `</tbody></table>`;
				$('#scheduleList').empty();
				$('#scheduleList').append(str);
		}
	});
}

function addform() {
	$.ajax({
		url : '/src/schedule/addSchedule.html',
		type : 'get',
		dataType : 'html',
    success: function (res) {
      console.log(res);
			$('#scheduleModal').modal('show');
			$('#nonScheduleList').html(res);
			$('#judul').html("Add Data Schedule");
		}
	});
}

function getId(t) {
	let id = t.getAttribute("value");
	$('#idS').val(id);
}

function editSchedule() {
	$.ajax({
		url : '/src/schedule/editSchedule.html',
		type : 'get',
		dataType : 'html',
		success : function(res) {
			$('#scheduleModal').modal('show');
			$('#nonScheduleList').html(res);
			$('#judul').html("Edit Data Schedule");
		}
	});
}

function deleteSchedule() {
  $.ajax({
		url : '/src/schedule/deleteSchedule.html',
		type : 'get',
		dataType : 'html',
		success: function (res) {
			$('#delScheduleModal').modal('show')
			$('#delScheduleList').html(res)
		}
	});
}

function closemodal() {
	$('#scheduleModal').modal('hide')
	$('#delScheduleModal').modal('hide')
	scheduleList()
}

function refreshpage(){
	$.ajax({
		url : '/src/schedule/schedule.html',
		type : 'get',
		dataType : 'html',
		success : function(result) {
			closemodal();
			$('#fragment').html(result)
		}
	});
	return false;
}