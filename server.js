var express  = require('express'),
	app 	 = express(),
	accounts = require('./accounts'),
	session = require('express-session'),
	mongoose = require('mongoose')
	;



app
	.use(express.static('./public'))
	.use(session({ secret : 'abcedef',cookie: { httpOnly: false }}))
	.use(accounts)
	.get('*' , function(req,res){
		if(req.session.email){
			res.sendFile(__dirname + '/public/main.html');
		}else{
			res.redirect('/login');
		}
	})
	.listen(3000);