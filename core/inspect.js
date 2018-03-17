/*
util.inspect是一个将任意对象转换成字符串的方法，通常用于调试和错误输出
*/
var util=require('util');

function Person(){
	this.name='peng';
	this.toString=function(){
		return this.name;
	}
}

var obj=new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj,true));