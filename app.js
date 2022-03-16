const express  = require('express');
const bodyParser = require('body-parser');
const ejs  = require('ejs');
const mongoose = require('mongoose');
const app =express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine' , 'ejs');

//////////////////DATABASE HANDLING////////////
mongoose.connect('mongodb://localhost:27017/loginDB');

const additionalSchema = {
	dob :Date,
	address : String
}

const userSchema = {
	uid    : String,
	uname  : String,
	lname  : String,
	mobile : String,
	email  : String,
	pwd    : String,
	add    : {
		additionalSchema
	}
}

const Users = new mongoose.model('userData' , userSchema);
//////////////////route handling///////////////
app.route('/')

.get((req , res)=>{
	res.render('homepage' , {errmsg : ""});
})

.post((req ,res)=>{
	const uname = req.body.uname;
	const pwd = req.body.pwd;
	const btn = req.body.btn;
	if(btn == 'sign'){
		res.redirect('/register');
	}else{
		Users.findOne({uid : uname} , (err , results)=>{
			if(results){
				if(results.pwd == pwd){
					res.redirect('/users/'+results._id);
				}else{
					res.render("homepage" , {errmsg : "Wrong Password"})
				}
			}else{
				res.render("homepage" , {errmsg : "User not found"});
			}
		})
	}
});

//////////////////REGISTER ROUTE///////////////
app.route('/register')
.get((req  , res)=>{
	res.render('register' , {errmsg : ""});
})
.post((req , res)=>{
	const uid = req.body.uid;
	const pwd = req.body.pwd;
	const btn  = req.body.btn;
	if(btn == 'skip'){
		res.redirect('/fetch/ ');
	}
	else{
		Users.findOne({uid :uid} , (err , results)=>{
			if(results){
				res.redirect("/additional/"+results._id);
			}else{
				res.redirect("resgister" , {errmsg : "User not found"});
			}
		})
	}
})

///////////////DATA FETCH ROUTE/////////////////
app.route('/fetch/:user')
.get((req , res)=>{
	const userData  = req.params.user;
	res.render("fetch" , {user : userData , errmsg : ''});
})
app.post('/fetch',(req , res)=>{
	//check if username already exisist
	Users.findOne(
		{uid : req.body.uid }, 
		(err , results)=>{
		if(results){
			res.render('fetch' , 
				{
					user : results  ,
					errmsg : "User Already exists"
				});
		}else{
			const newUser = new Users({
			uid    : req.body.uid,
			uname  : req.body.fname,
			lname  : req.body.lname,
			mobile : req.body.mobile,
			email  : req.body.email,
			pwd    : req.body.pwd
			});
			newUser.save(err=>{
				if(!err){
				   res.redirect('/additional/'+newUser._id);
				}else{
					res.send("Something went wrong");
				}
			});
		}
	})


})


app.route('/additional/:user')
.get((req , res)=>{
	const user  = req.params.user;
	Users.findById(user  , (err , results)=>{
		if(results){
 		  res.render("additional" , {
		   uname : results.uname , 
		   id : results._id
	      });
		}
	})

})
.post((req , res)=>{
	const user = req.body.uid;
	Users.findById(user , (err , results)=>{
		if(results){
			res.redirect('/users/'+results._id);
		}else{
			res.send("Something Went Wrong 1");
		}
	})

})

///////////////USER DYNAMIC ROUTE///////////////

app.route('/users/:uid')
.get((req , res)=>{
	const uid = req.params.uid;
	Users.findById(uid, (err , results)=>{
		if(results){
			res.render("users" , {user : results});
		}else{
			res.send("Something went wrong");
		}
	})
	
})

////////////////PORT HANDLING///////////////////
let PORT = process.env.PORT;
if(PORT == '' || PORT == null){
	PORT = 3000;
}

app.listen(PORT , (err)=>{
	if(!err){
		console.log('Server Live at Port 3000');
	}
});