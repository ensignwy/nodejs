/*
hhtp.ClientRequest是由http.request或http.get返回产生的对象，表示一个已经产生而且正在进行中的
http请求，它提供一个response事件，即http.request或http.get第二个参数指定的
回调函数的绑定对象。我们也可以显示地绑定这个事件的监听函数
*/


var http=require('http');
var req=http.get({host:'www.byvoid.com'});

req.on('response',function(res){
	res.setEncoding('utf8');
	res.on('data',function(data){
		console.log(data);
	})
});

