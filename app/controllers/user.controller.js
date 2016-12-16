var User = require('mongoose').model('User');

exports.create = function(req , res ,next){
	var user = new User(req.body);

	user.save(function(err){
		if(err){
			return next(err);
		}else{
			res.json(user);
		};
	});

};

exports.login = function(req,res){
	console.log(req.body);
	console.log('Email : '+ req.body.email);
	console.log('Password : '+ req.body.password);

		if(req.body.remember == 'remember'){
		req.session.remember = true;
		req.session.email = req.body.email;
		req.sessionOptions.maxAge = 60000;
	}

	req.checkBody('email', 'Invalid email').notEmpty().isEmail();
	req.sanitizeBody('email').normalizeEmail();
	var errors = req.validationErrors();
	if(errors){
		res.render('index',{
			title: 'There have been validation errors: ' + JSON.stringify(errors),
			isLoggedIn: false
		});
		return;
	}


	res.render('index',{
		title: 'Loin in as'+ req.body.email,
		isLoggedIn: true
	});

};

exports.logout = function(req,res){
	console.log(req.body)
	req.session = null;

	res.render('index',{
		title: 'Logout Complice',
		isLoggedIn: false
	});
};
