$(document).ready(function(){
	$('#submit').on('click', submit);
	$('.form').on('keydown', function(evt){
		if (evt.keyCode==13){
			if (evt.target.tagName.toLowerCase()==='textarea'){
				return;
			}
			submit.call(this, evt);
		}
	});
});
function success(msg, target){
	$(target || '#result').removeClass('error').addClass('success').html(msg).show();
}
function error(err, target){
	var msg = '';
	if (typeof err == 'string'){
		msg = err;
	}
	else{
		msg = 'Error  '+err.status+' '+err.statusText;
	}
	$(target || '#result').addClass('error').removeClass('success').html(msg).show();
}