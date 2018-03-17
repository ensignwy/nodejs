/*把文件夹封装成一个模块，即包，默认就可以这样直接访问,通过定制package.json，我们可以创建更复杂的包*/

exports.hello=function(){
	console.log('Hello')
}