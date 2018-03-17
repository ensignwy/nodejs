/*
    Node.js的包是一个目录，其中包含一个JSON格式的包说明文件package.json。严格符
合CommonJS规范的包应该具备以下特征:
    1.package.json必须在包的顶层目录下;
    2.二进制文件应该在bin目录下;
    3.JavaScript代码应该在lib目录下;
    4.文档应该在doc目录下;
    5.单元测试应该在test目录下。
    Node.js对包的要求并没有这么严格，只要顶层目录下有package.json，并符合一些规范
即可。当然为了提高兼容性，我们还是建议你在制作包的时候，严格遵守CommonJS规范。

*/
var somePackage=require('./somepackage');
somePackage.hello();