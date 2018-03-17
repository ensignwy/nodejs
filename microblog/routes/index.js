var express = require('express');
var router = express.Router();
var User=require('../models/user.js');
var Post=require('../models/post.js');
//加密并生成各种散列
var crypto=require('crypto');

/* 整个微博系统的路由 */
//首页
router.get('/', function(req, res, next) {
	// throw new Error('测试错误日志');
	//调用视图模板index，返回变量Express
	//res.render的功能是调用模板引擎,第一个参数是模板的名称，即views(app.js中配置过)目录下的模板文件名，不包含扩展名
	Post.get(null,function(err,posts){
		if(err){
			posts=[]
		}
		res.render('index', { title: '首页',posts:posts });
	})
  	
});
//用户主页
router.get('/u/:user',checkLogin);
router.get('/u/:user', function(req, res, next) {
  User.get(req.params.user,function(err,user){
  	if(!user){
  		req.flash('error','用户不存在');
  		return req.redirect('/');
  	}
  	Post.get(req.params.user,function(err,posts){
  		if(err){
  			req.flash('error',err);
  			req.redirect('/');
  		}
  		res.render('user',{
  			title:user.name,
  			posts:posts
  		})
  	})
  })
});
//发表信息
router.post('/post',checkLogin);
router.post('/post', function(req, res, next) {
  var currentUser=req.session.user;
  var post=new Post(currentUser.name,req.body.post,new Date());
  post.save(function(err){
  	if(err){
  		req.flash('error',err);
  		return res.redirect('/');
  	}
  	req.flash('success','发表成功');
  	console.log(currentUser.name)
  	res.redirect('/u/'+currentUser.name);
  })
});

//登陆
router.get('/login',checkNotLogin);
router.get('/login', function(req, res, next) {
  res.render('login',{title:'用户登录'});
});
router.post('/login',checkNotLogin);
router.post('/login', function(req, res, next) {
  var md5=crypto.createHash('md5');
  // var password=md5.update(req.body.password).digest('base64');
  var password=md5.update(req.body.password).digest('base64');
  User.get(req.body.username,function(err,user){
  	if(!user || user.password!=password){
  		req.flash('error','用户名或密码不正确');
  		return res.redirect('/login');
  	}
  	req.session.user=user;
  	req.flash('success','登录成功');
  	res.redirect('/');
  })
});

//登出
router.get('/logout',checkLogin);
router.get('/logout', function(req, res, next) {
  req.session.user=null;
  req.flash('success','登出成功');
  res.redirect('/');
});

//注册
router.get('/reg',checkNotLogin);
router.get('/reg', function(req, res, next) {
  res.render('reg',{})
});
//注册的post响应函数
router.get('/reg',checkNotLogin);
router.post('/reg',function(req,res){
	console.log(req.body)
	//校验两次输入密码是否一致
	if(req.body['password']!=req.body['password-repeat']){
		req.flash('error','两次输入口令不一致');
		return res.redirect('/reg');
	}

	//生成口令的散列值
	var md5=crypto.createHash('md5');
	var password=md5.update(req.body.password).digest('base64');
	var newUser=new User({
		name:req.body.username,
		password:password
	})

	//检查用户名是否已经存在
	User.get(newUser.name,function(err,user){
		if(user){
			err='用户名已经存在';
		}
		if(err){
			req.flash('error',err);
			return res.redirect('/reg');
		}

		newUser.save(function(err){
			debugger;
			if(err){
				req.flash('error',err);
				return res.redirect('/reg');
			}
			//注册完了，默认登陆
			req.session.user=newUser;
			req.flash('success','注册成功');
			res.redirect('/');
		})
	})
})

//路由中间件，控制权限
function checkLogin(req,res,next){
	if(!req.session.user){
		req.flash('error','未登录');
		return res.redirect('/login');
	}
	next();
}
function checkNotLogin(req,res,next){
	if(req.session.user){
		req.flash('error','已登录');
		return res.redirect('/');
	}
	next();
}

module.exports = router;
