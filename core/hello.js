
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

module.exports=Hello;
