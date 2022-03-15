const express  = require('express');
const bodyParser = require('body-parser');
const ejs  = require('ejs');
const app =express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine' , 'ejs');

//////////////////route handling///////////////
app.route('/')

.get((req , res)=>{
	res.render('homepage');
})

.post((req ,res)=>{
	const uname = req.body.uname;
	const pwd = req.body.pwd;
	const btn = req.body.btn;
	if(btn == 'sign'){
		res.redirect('/register');
	}else{
		//write code here to take user to user dashboard
		res.redirect('/');
	}
});

//////////////////REGISTER ROUTE///////////////
app.route('/register')
.get((req  , res)=>{
	res.render('register');
})
.post((req , res)=>{
	const uid = req.body.uid;
	const btn  = req.body.btn;
	user = {
		name: "Lee"
	};
	if(btn == 'skip'){
		res.redirect('/fetch/ ');
	}
	else{
		// write code for searching the user and sending the user id
	}
})

///////////////DATA FETCH ROUTE/////////////////
app.route('/fetch/:user')
.get((req , res)=>{
	const userData  = req.params.user;
	res.render("fetch" , {user : userData});
})
app.post('/fetch',(req , res)=>{
	const fname = req.body.fname;
	const lname  = req.body.lname;
	const mob = req.body.mobile;
	const mail = req.body.email;
	console.log(fname + " " + lname + " "  +mob +" " + mail);

	//write code here to register the data on database 
	res.redirect('/additional/'+fname);
})


app.route('/additional/:user')
.get((req , res)=>{
	const user  = req.params.user;
	res.render("additional" , {
		uname : user
	});
})

.post((req , res)=>{
	//write code for uploading registered data here and fetch the user id
	res.redirect('/user/'+'leeparker')
})

///////////////USER DYNAMIC ROUTE///////////////

app.route('/users/:uid')

.get((req , res)=>{
	const uid = req.params.uid;
	res.render('users' , {uname : uid});
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