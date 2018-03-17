var mongoClient=require('mongodb').MongoClient;
var settings=require('../settings.js')
function Post(username,post,time){
	this.user=username;
	this.post=post;
	this.time=time;
}
module.exports=Post;


Post.prototype.save=function save(callback){
	//存入mongodb文档
	var post={
		user:this.user,
		post:this.post,
		time:this.time
	}
	mongoClient.connect(settings.url,function(err,client){
		if(err){
			return callback(err);
		}
		//读取post集合
		client.db(settings.db).collection('posts',function(err,collection){
			if(err){
				client.close();
				return callback(err);
			}
			//写入post文档
			collection.insert(post,{safe:true},function(err,user){
				client.close();
				callback(err,post);
			})
		})
	})
}


Post.get=function get(username,callback){
	mongoClient.connect(settings.url,function(err,client){
		if(err){
			console.log(err)
			return callback(err);
		}

		//读取user集合
		client.db(settings.db).collection('posts',function(err,collection){
			if(err){
				client.close();
				return callback(err);
			}
			//查找user属性为username的文档，如果为空则匹配所有
			var query={};
			if(username){
				query.user=username;
			}
			collection.find(query).sort({time:-1}).toArray(function(err,docs){
				client.close();
				if(err){
					callback(err,null);
				}
				//封装posts为post对象
				var posts=[];
				docs.forEach(function(doc,index){
					var post=new Post(doc.user,doc.post,doc.time);
					posts.push(post);
				})
				callback(null,posts);

			});
			
		});
	});
}