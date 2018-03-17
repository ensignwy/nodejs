//例子1
// var scope='global';
// var f=function(){
// 	console.log(scope);
// 	scope='f';
// }
// f();

//例子2
// var f=function(){
// 	var scope='f0';
// 	(function(){
// 		var scope='f1';
// 		(function(){
// 			console.log(scope)
// 		})();
// 	})();
// }
// f();

/**
 * 例子3：函数作用域的嵌套关系是定义时决定的而不是调用时决定的，也就是说javascript的作用域是静态作用域，又叫此法作用域，这是因为嵌套关系在语法分析时确定，而不必等到运行时确定，下面的例子说明这一切
 */
// var scope='top';
// var f1=function(){
// 	console.log(scope);
// }
// f1();//输出top
// var f2=function(){
// 	var scope='f2';
// 	f1();
// }
// f2();//输出top


/**
 * 理解闭包，从嵌套函数开始
 */
// var generateClosure=function(){
// 	var count=0;
// 	var get=function(){
// 		count++;
// 		return count;
// 	}
// 	return get;
// }
// var counter1=generateClosure();
// var counter2=generateClosure();
// console.log(counter1()); //1
// console.log(counter2()); //1
// console.log(counter1()); //2
// console.log(counter1()); //3
// console.log(counter2()); //2


/**
 * call实现对象的继承
 */
// var someuser={
// 	name:'peng',
// 	dispaly:function(words){
// 		console.log(this.name+' says '+words);
// 	}
// }
// var foo={
// 	name:'foobar'
// };
// someuser.dispaly.call(foo,'hello');


/**
 * bind指定上下文对象
 */
// var someuser={
// 	name:'peng',
// 	func:function(){
// 		console.log(this.name);
// 	}
// }
// var foo={
// 	name:'foobar'
// };
// foo.func=someuser.func;
// foo.func();//输出foobar

// foo.func1=someuser.func.bind(someuser);
// foo.func1();//输出peng

// func=someuser.func.bind(foo);
// func();//输出foobar

// func2=func;
// func2();//输出foobar


/**
 * 使用bind绑定参数列表
 */
// var person={
// 	name:'peng',
// 	says:function(act,obj){
// 		console.log(this.name + ' '+ act + ' ' + obj);
// 	}
// }
// person.says('loves','apple');//输出peng loves apple
// pengLoves=person.says.bind(person,'loves');
// pengLoves('you');// 输出peng loves you


/**
 * 理解bind
 * 因为this.call(self)的作用就是以self作为this调用someuser.func.  
 * 详见上下文对象.md
 */
// var someuser={
// 	name:'peng',
// 	func:function(){
// 		console.log(this.name);
// 	}
// };
// var foo={
// 	name:'foobar'
// }
// func = someuser.func.bind(foo);
// func();//输出foobar

// func2=func.bind(someuser);
// func2();//输出foobar

// someuser.func.bind=function(self){
// 	return this.call(self);
// }
// //将func = someuser.func.bind(foo);展开
// func=function(){
// 	return someuser.func.call(foo);
// }
// // 将func2=func.bind(someuser);展开f
// func2 = function(){
// 	return func.call(someuser);
// }

/**
 * 原型理解
 */
// function Person(){
// }
// Person.prototype.name='peng';
// Person.prototype.showName=function(){
// 	console.log(this.name);
// }
// var person=new Person();
// person.showName();

// function Foo(){
// 	var innerVar = 'hello';
// 	this.prop1 = 'peng';
// 	this.func1 = function(){
// 		innerVar = '';
// 	}
// }
// Foo.prototype.prop2 = 'apple';
// Foo.prototype.func2 = function(){
// 	console.log(this.prop2);
// }
// var foo1=new Foo();
// var foo2=new Foo();
// console.log(foo1.func1 == foo2.func1);//输出false
// console.log(foo1.func2 == foo2.func2);//输出ture


// function Foo(){
// }
// Object.prototype.name='Ny Object';
// Foo.prototype.name='Bar';
// var obj = new Object();
// var foo = new Foo();
// console.log(obj.name);//输出My Object
// console.log(foo.name);//输出Bar
// console.log(foo.__proto__.name);//输出Bar
// console.log(foo.__proto__.__proto__.name);//输出My Object
// console.log(foo.__proto__.constructor.prototype.name);//输出Bar

/**
 * 对象的复制
 */
// var obj = {
// 	name:'peng',
// 	likes:['node']
// }
// var newObj = obj;
// obj.name='apple'
// obj.likes=['node','java']
// console.log(obj.name+' '+obj.likes) //apple node,java
// console.log(newObj.name + ' ' + newObj.likes) //apple node,java

// var a=123;
// var b=a;
// b=123456;
// console.log(a); //123456
// console.log(b); //123

// //或者是

// var a='afafas';
// var b=a;
// a='fgfdsdsgs';
// console.log(a); //fgfdsdsgs
// console.log(b); //afafas

/**
 * 实现对象的浅拷贝
 */
// Object.prototype.clone = function (){
// 	var newObj = {};
// 	for (var i in this){
// 		newObj[i] = this[i];
// 	}
// 	return newObj;
// }
// var obj = {
// 	name: 'peng',
// 	likes: ['node']
// };
// var newObj = obj.clone();
// obj.likes.push('java');
// console.log(obj.likes); //输出[ 'node', 'java' ]
// console.log(newObj.likes);//输出[ 'node', 'java' ]

/**
 * 对象的深拷贝
 */

Object.prototype.clone = function() {
	var newObj = {};
	for (var i in this){
		if (typeof(this[i]) == 'object' || typeof(this[i]) == 'function'){
			newObj[i] = this[i].clone();
		}else{
			newObj[i] = this[i];
		}
	}
	return newObj;
}
Array.prototype.clone = function() {
	var newArray = [];
	for(var i = 0; i < this.length; i++){
		if(typeof(this[i]) == 'object' || typeof(this[i]) == 'function'){
			newArray[i] = this[i].clone();
		}else{
			newArray[i] = this[i];
		}
	}
	return newArray;
}
Function.prototype.clone = function(){
	var that = this;
	var newFunc = function(){
		return that.apply(this, arguments);
	};
	for (var i in this) {
		newFunc[i] = this[i];
	}
	return newFunc;
}
var obj = {
	name: 'peng',
	likes: ['node'],
	dispaly: function(){
		console.log(this.name);
	}
};
var newObj = obj.clone();
newObj.likes.push('java');
console.log(obj.likes); //输出[ 'node' ]
console.log(newObj.likes);//输出[ 'node', 'java' ]
console.log(newObj.dispaly == obj.dispaly)//输出false

