/*
全局对象
    JavaScript中有一个特殊的对象，称为全局对象(Global Object )，它及其所有属性都可
以在程序的任何地方访问，即全局变量。在浏览器JavaScript中，通常window是全局对象，
而Node.js中的全局对象是global，所有全局变量(除了global本身以外)都是global
对象的属性。
    我们在Node.js中能够直接访问到对象通常都是global的属性，如console,proce二二
等.

process是一个全局变量，用来描述当前Node.js进程状态的对象，提供了一个与
操作系统的简单接口，下面是输出命令行参数
运行: node argv.js 1999 name=zhangsan --v "ddd"

*/
console.log(process.argv);