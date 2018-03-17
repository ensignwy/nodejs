
//单次加载
var hello1 = require('./module.js');
hello1.setName('Peng');


var hello2 = require('./module.js');
hello2.setName('Peng1');


//因为指向的是同一个实例
hello1.sayHello();