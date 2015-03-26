var express = require('express'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	crypto  = require('crypto'),
	mongoose = require('mongoose')
	;
	

mongoose.connect('mongodb://localhost/discussion');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email : { type : String, required : true},
	password : {type : String, required : true}
});

var CommentSchema = new Schema({
	comment : { type : String, required : true},
	posted_by : { type: String, required :true },
	date 	: { type : Date, default : Date.now }
});

var User 	= mongoose.model('User',UserSchema);
var Comment = mongoose.model('Comment',CommentSchema);

var router  = express.Router();

function hashThePassword(password){
	return crypto.createHash('sha256').update(password).digest('hex');
}

router
	.use(bodyParser.urlencoded())
	.use(bodyParser.json())
	.use(session({ secret : 'abcedef',cookie: { httpOnly: false }}))
	.get('/login', function(req,res){
		res.sendFile(__dirname + '/public/main.html');
	})
	.post('/login',function(req, res){
		var user = {
			email : req.body.email,
			password : hashThePassword(req.body.password)
		}

		
		User.findOne(user, function(err,data){
			if (err || !data) {
				console.log('Cannot find User');
				res.json({"message": "Login Attempt Failed. Please Try Again","value" : "0"});
			}
  			else {
  				console.log('User found');
  				req.session.email = data.email;
  				res.json({"message": "Login Attempt Successful. Redirecting you...","value" : "1"});
  			}
		});
	})
	.post('/register',function(req,res){

		var user = new User({
			email : req.body.email,
			password : hashThePassword(req.body.password)
		});

		user.save(function(err){
			if(!err){
				res.json({"message" : "You have been Registered. Try Logging in...","value" : "1"});
			}else {
				res.json({"message" : "User Registeration failed","err" : err,"value" : "0"});
			}
		});


	})
	.get('/myuser',function(req,res){
		res.json( { "email" : req.session.email});
	})
	.get('/logout',function(req,res){
		req.session.email = null;
		res.redirect('/');
	})
	.get('/comment',function(req,res){

		Comment.find().sort({"date" : 1}).exec(function(err,comments){
			res.send(comments);
		});
	})
	.post('/comment',function(req,res){
		
		var comment = new Comment({
			comment   : req.body.comment,
			posted_by : req.session.email,
			date 	  : Date.now()
		})

		comment.save(function(err,data){
			if(!err){
				res.json({"data" : data,"success" : "1"});
			}else {
				res.json({"success" : "0"});
			}
		});
	});

module.exports = router;


