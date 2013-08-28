var express = require('express'),
	bcrypt = require('bcrypt'),
	UA = require("urban-airship"),
	fs = require('fs'),
	app = express(),
	port = process.env.PORT || 17020;

/**
* Check that admin credentials are set 
**/
if (!process.env.LOG_USERNAME || !process.env.LOG_PASSWORD){
	console.error('Login credentials are not properly configured');
	process.exit(0);
}

/**
* Check that Urban Airship config is OK
**/
if (!process.env.UA_KEY || !process.env.UA_SECRET || !process.env.UA_MASTER){
	console.error('Urban Airship isn\'t properly configured');
	process.exit(0);
}

console.log('Hashed password is',process.env.LOG_PASSWORD);

/**
* Set up app
**/
var UAClient = new UA(process.env.UA_KEY, process.env.UA_SECRET, process.env.UA_MASTER);

/** Middleware to check session status **/
var logged = function(req, res, next){
  if (!req.session || !req.session.user){
    if (req.headers.accept && req.headers.accept.match(/json/)){
		res.status(403);
		return res.json({msg:'Access denied'});
    }
    else{
		res.redirect('/signin');
    }
  }
  next();
};


app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
	secret: 'this is a secret',
    cookie: {maxAge: 3600000 ,  secure: false, httpOnly:false }
   })
);
app.use(express.favicon());
app.use(express.static('public'));
app.set('view engine', 'ejs');


/* routes */
app.get('/', logged, function(req, res){
	res.set('Content-Type', 'text/html');
	//res.sendfile('./public/compose-broadcast.html');
	res.render('compose', {title:process.env.APP_TITLE});
});
app.get('/signin', function(req, res){
	res.set('Content-Type', 'text/html');
	//res.sendfile('./public/signin.html');
	res.render('signin', {title:process.env.APP_TITLE});
});
app.post('/signin', function(req, res){
	if (!req.body || !req.body.username || !req.body.password){
		res.status(400);
		return res.json({msg:'Invalid request'});
	}
	if (req.body.username !== process.env.LOG_USERNAME){
		res.status(404);
		return res.json({msg:'Unkown user'});
	}
	bcrypt.compare(req.body.password, process.env.LOG_PASSWORD, function(errCheck, resCheck) {
		if (errCheck){
			res.status(500);
			return res.json({msg:'Unable to authenticate user. Please try again later'});
		}
		if (!resCheck){
			res.status(403);
			return res.json({msg:'Invalid credentials'});
		}

		req.session.user = {username:process.env.LOG_USERNAME};

		return res.json({msg:'ok'});
	});
});
app.post('/broadcast',logged, function(req, res){
	/**
	* Check that the expected params have been sent
	**/
	if (!req.body || !req.body.message || (req.body.iOS==='false' && req.body.android==='false')){
		res.status(400);
		return res.json({msg:'Invalid request'});
	}
	/**
	* Publish broadcast message
	**/
	var notification = {};
	if (req.body.iOS==='true'){

		notification.aps = {alert:req.body.message};
	}
	if (req.body.android==='true'){
		notification.android = {alert:req.body.message};
	}
	UAClient.pushNotification("/api/push/broadcast/", notification, function(err) {
		if (err){
			console.log("UA err", err);
			res.status(500);
			return res.json({msg:"An error occurred", errDetails:err});
		}
		else{
			return res.json({msg:"Your message is being broadcasted to the users"});
		}
	});
});

console.log('Listening on port '+port);
app.listen(port);


