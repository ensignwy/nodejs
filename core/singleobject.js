
/*把对象封装到模块中*/
function Hello(){
	var name;
	this.setName=function(thyName){
		name=thyName;
	}
	this.sayHello=function(){
		console.log('Hello '+name);
	}
}
//这样写的话在其他文件中需要通过require('./singleobject').Hello来获取，这比较冗余
exports.Hello=Hello;
//可以这样简化
//module.exports=Hello;
