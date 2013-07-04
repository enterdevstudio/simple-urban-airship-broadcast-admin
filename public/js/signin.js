function submit(evt){
		var credentials = {username:null, password:null};
		$('.form input').removeClass('error');

		var $tmp;
		Object.keys(credentials).forEach(function(key){
			$tmp = $('#'+key);
			if (!$tmp.val()){
				$tmp.addClass('error');
			}
			else{
				credentials[key] = $tmp.val();
			}
		});
		if (!credentials.username || !credentials.password){
			return false;
		}
		$.ajax({
			type:'post',
			url:'/signin',
			data:credentials,
			error:function(err){
				error(err.responseJSON ? err.responseJSON.msg : err);
			},
			success:function(){
				window.location.href = '/';
			}
		});
}