$("#form-user-edit").validate({
	rules:{
		userName:{
			required:true,
		},
		deptName:{
			required:true,
		},
		password:{
			required:true,
			minlength: 6
		},
		email:{
			required:true,
			email:true
		},
		phonenumber:{
			required:true,
		},
	},
	submitHandler:function(form){
		update();
	}
});

function update() {
	var userId = $("input[name='userId']").val();
	var deptId = $("input[name='deptId']").val();
	var userName = $("input[name='userName']").val();
	var password = $("input[name='password']").val();
	var email = $("input[name='email']").val();
	var phonenumber = $("input[name='phonenumber']").val();
	var sex = $("input[name='sex']:checked").val();
	var status = $("input[name='status']").is(':checked') == true ? 0 : 1;
	var roleIds = $.getCheckeds("role");
	var postIds = $.getSelects("post");
	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "system/user/save",
		data : {
			"userId": userId,
			"deptId": deptId,
			"userName": userName,
			"password": password,
			"email": email,
			"phonenumber": phonenumber,
			"sex": sex,
			"status": status,
			"roleIds": roleIds,
			"postIds": postIds
		},
		async : false,
		error : function(request) {
			$.modalAlert("系统错误", "error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("修改成功,正在刷新数据请稍后……",{icon:1,time: 500,shade: [0.1,'#fff']},function(){
					$.parentReload();
				});
			} else {
				$.modalAlert(data.msg, "error");
			}
		}
	});
}

/*用户管理-修改-选择部门树*/
function selectDeptTree() {
	var deptId = $("#treeId").val();
    var url = ctx + "system/dept/selectDeptTree/" + deptId;
    layer_show("选择部门", url, '380', '380');
}
