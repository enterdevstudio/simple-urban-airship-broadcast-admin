var fs = require('fs'),
	bcrypt = require('bcrypt');
var credentials = {salt:bcrypt.genSaltSync(10)};


function sanitizeOutput(input){
	return input.replace(/\$/gi, '\\$');
}

process.stdout.write('=== Set up the credentials that will be used to access the admin panel ====\n');
process.stdout.write('Username : ');
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.once('data', function (data){
	credentials.username = data.toString().trim();
	process.stdout.write('Password (will be hashed): ');
	process.stdin.once('data', function (data){
		credentials.password = bcrypt.hashSync(data.toString().trim(),credentials.salt);
		console.log('\nAdd these credentials in your app env. : \n');
		console.log('\tLOG_USERNAME:"'+sanitizeOutput(credentials.username)+'",');
		console.log('\tLOG_PASSWORD:"'+sanitizeOutput(credentials.password)+'"\n');

		console.log('If the app is running on heroku, run the following commands :');
		console.log('\t $ heroku config:set LOG_USERNAME:'+credentials.username);
		console.log('\t $ heroku config:set LOG_PASSWORD:'+credentials.password);

		process.exit(0);
	});
});
