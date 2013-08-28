#Simple Urban Airship Broadcast Admin Panel

##Purpose

If you need someone to be able to send easily push notifications to your users. 

Giving access to the Urban Airship Dashboard can be tricky, as there options that shouldn't be messed with by everyone.

You can easily set up a small page protected by a password, where all you can do is send a broadcast message using Urban Airship API

##Functionalities

###Publish broadcast messages to registered users

Using the Urban Airship API & node module

##Usage

###1. Set up the admin credentials

Run


		$ node ./init.js

And set the appropriate env variables

* Urban Airship
	*	UA_KEY
	* UA_SECRET
	* UA_MASTER
* Login credentials
	*  LOG_USERNAME
	* LOG_PASSWORD
* App info
	* APP_NAME
	* APP_DESCRIPTION

###2. Get your urban airship keys

* Log in your UA account
* Access your app settings
* Click on "Settings > API keys"
* Here they are

###3. Run


	$ node UA_KEY="Your urban airship key" UA_SECRET="Your urban airship secret key" "UA_MASTER"="Your urban airship master secret key" LOG_USERNAME="Username to log in" LOG_PASSWORD="Hash set on 1."
```


###2. Log in

* Access /
* Sign in
* Write your message
* Hit 'Publish'



##Technology

* node
* express
* bcrypt
* urban airship npm module