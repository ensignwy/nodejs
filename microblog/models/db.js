/*
这个文件本是mongodb3.0以下版本中写法的一个封装，但是在3.0以上的mongodb中不能这么用
*/
var settings=require('../settings');
var Db = require("mongodb").Db; 
var Connection=require('mongodb').Connection;
var Server=require('mongodb').Server;

//这里使用的Connection是undefined,所以直接写端口号代替
// module.exports=new Db(settings.db,new Server(settings.host,Connection.DEFAULT_PORT,{}));
module.exports=new Db(settings.db,new Server(settings.host,27017,{}));
//3.0后的版本直接用connect建立连接，如果像上面这么写，然后使用mongodb.open会报错is not a function

