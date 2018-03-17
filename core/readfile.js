/*使用异步的方式读取一个文件*/

// 加载File System读写模块  
var fs=require('fs');
fs.readFile('file.txt','utf-8',function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});
console.log('end')