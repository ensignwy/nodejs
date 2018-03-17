var util=require('util');

function Base(){
	//构造函数内部的属性和函数没有被Sub继承
	this.name='base';
	this.base=1991;
	this.sayHello=function(){
		console.log('Hello '+this.name);
	}
}

//Sub仅仅继承了Base在原型中定义的函数
Base.prototype.showName=function(){
	console.log(this.name);
};

function Sub(){
	this.name='sub';
}

/*
    util.inherits(constructor,superConstructor)是一个实现对象间原型继承
的函数。JavaScript的面向对象特性是基于原型的，与常见的基于类的不同。JavaScript没有
提供对象继承的语言级别特性，而是通过原型复制来实现的，具体细节我们在附录A中讨论，

*/
//让Sub继承Base
util.inherits(Sub,Base);

var objBase=new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

var objSub=new Sub();
objSub.showName();
// objSub.sayHello();
console.log(objSub);


