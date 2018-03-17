/*工程的入口*/
//写入日志
var fs=require('fs');
var accessLogfile=fs.createWriteStream('access.log',{flag:'a'});//访问日志
var errorLogfile=fs.createWriteStream('error.log',{flag:'a'});//错误日志

var express = require('express');
//express4中要另外安装和引入partials
var partials = require('express-partials');
var path = require('path');
var favicon = require('serve-favicon');
//HTTP request logger middleware for node.js
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session    = require('express-session');
//flash 是 session 中一个用于存储信息的特殊区,依赖于express-session模块
var flash = require('connect-flash');


//mongodb
var MongoStore=require('connect-mongo')(session);
var settings=require('./settings');
var db=require('./models/db')

var index = require('./routes/index');
var users = require('./routes/users');
var userList = require('./routes/userList');

//通过express创建了一个应用实例
var app = express();

//app.set是express的参数设置工具
app.set('views', path.join(__dirname, 'views'));//视图文件目录
app.set('view engine', 'jade');//视图模板引擎

//Express提供了一个访问日志中间件
app.use(logger({stream:accessLogfile}));



/*app.use 加载用于处理http請求的middleware（中间件），当一个请求来的时候，会依次被这些 middlewares处理。
执行的顺序是你定义的顺序,可以简单的理解为过滤器*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cookie解析的中间件
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//配置了静态文件服务器，
app.use(flash());

//提供session支持
app.use(session({
  secret:settings.cookieSecret,
  /*提供会话支持，设置它的store参数为MongoStore实例，把会话信息存储在数据库中，防止丢失
    根据文档https://github.com/jdesboeufs/connect-mongo#create-a-new-connection-from-a-mongodb-connection-string
    有多种方法可以建立连接
  */
  //MongoDB connection strings are the best way to configure a new connection
  store:new MongoStore({
    url:settings.url
  })

}))

//一些常用的变量(在视图中需要访问的会话中的数据)
app.use(function(req,res,next){
  res.locals.user=req.session.user;
  var err=req.flash('error');
  res.locals.error=err.length?err:null;
  var succ=req.flash('success');
  res.locals.success=succ.length?succ:null;
  //如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。
  next();
})

//路由控制器，如果用户访问"/"路径，则由router/index来控制
//整个微博系统的路由都卸载index.js里面
app.use('/', index);


//----以下是一些测试路由
app.use('/users', users);
app.get('/list',function(req,res){
	res.render('list',{
		title:'List',
		items:[1991,'byvoid','express','Node.js']
	})
	
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //生产环境下写入日志文件
  if (req.app.get('env') === 'production'){
    var meta = '[' + new Date() + ']' +req.url + '\n';
    errorLogfile.write(meta +err.stack + '\n');
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    message: err.message,
    error: req.app.get('env') === 'development' ? err : ''
  });
});

//关闭布局功能
// app.set('view options',{
// 	layout:false
// })

//为了在外部模块调用app.js，首先需要禁止服务器自启动
//这样直接调用node app.js服务器会启动，但是在其他模块中调用require(./app)则不会启动
if (!module.parent){
  var server=app.listen(3000,function(){
    var port=server.address().port
    console.log('Exress server listening on port %d in %s mode',port,app.settings.env);
  });
  
}


module.exports = app;
