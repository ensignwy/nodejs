var mongoClient=require('mongodb').MongoClient;
var settings=require('../settings.js')
function User(user){
	this.name=user.name;
	this.password=user.password;
}
module.exports=User;

//对象实例方法，保存
//保存、删除和更新这些操作都是针对一个特定的实例的，是实例上的方法，所以通过原型共享这些方法,要new出来一个实例才能使用这个方法
User.prototype.save=function save(callback){
	//存入mongodb文档
	var user={
		name:this.name,
		password:this.password
	}
	mongoClient.connect(settings.url,function(err,client){
		if(err){
			return callback(err);
		}
		//读取users集合
		client.db(settings.db).collection('users',function(err,collection){
			if(err){
				client.close();
				return callback(err);
			}
			//为name属性添加索引
			collection.ensureIndex('name',{unique:true});
			//写入user文档
			collection.insert(user,{safe:true},function(err,user){
				client.close();
				callback(err,user);
			})
		})
	})
}

//对象构造函数方法，查找指定用户
//和new出来的实例没关系，是为了针对User类而定义出来的
User.get=function get(username,callback){
	mongoClient.connect(settings.url,function(err,client){
		if(err){
			console.log(err)
			return callback(err);
		}

		//读取user集合
		client.db(settings.db).collection('users',function(err,collection){
			if(err){
				client.close();
				return callback(err);
			}
			//查找
			collection.findOne({name:username},function(err,doc){
				client.close();
				if(doc){
					//封装文档为User对象
					var user=new User(doc);
					callback(err,user);
				}else{
					callback(err,null);
				}
			});
		});
	});
}