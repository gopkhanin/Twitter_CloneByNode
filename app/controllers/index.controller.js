exports.render = function(req,res){
	var isLoggedIn = false;

	if(typeof req.session.remember !== 'undefined'){
		isLoggedIn = req.session.remember;
	}
}

exports.render = function(req,res){
	res.render('index.jade',{
		'title':'เข้าสู่ระบบ',
		'message': "I'm Programmer", 
	});
};