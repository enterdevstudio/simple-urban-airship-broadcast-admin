var broadcastMessageParams = {
	default:'Type your message here',
	min:6,
	max:120
};
function submit(evt){
	$('#result').hide();
	var message = $('#message').val(),
		biOS = $('#ios').is(':checked'),
		bAndroid = $('#android').is(':checked');

	if (!message || message.length < broadcastMessageParams.min || message.length>broadcastMessageParams.max || message === broadcastMessageParams.default){
		return error('Please enter a valid message');
	}
	if (!biOS && !bAndroid){
		return error('Please select at least one platform');
	}
	$.ajax({
		type:'post',
		url:'/broadcast',
		dataType:'json',
		data:{message:message, iOS:biOS, android:bAndroid},
		error:function(err){
			if (err.statusCode == 200){
				//We got a 200 response, but not in the expected contentType
				//Probably : session timed out, and the server sent
			}
			console.log('error', err);
			error(err.responseJSON ? err.responseJSON.msg : err);
		},
		success:function(res){
			success(res.msg);
		}
	})

}
$(document).ready(function(){
	$('#message').val(broadcastMessageParams.default).attr('maxlength', broadcastMessageParams.max);

	$('#message').on('focus', function(evt){
		var $msg = $(evt.currentTarget);
		if ($msg.val()===broadcastMessageParams.default){
			$msg.val("");
		}
	});
});