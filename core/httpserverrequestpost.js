/*获取post请求内容*/
var http=require('http');
var url=require('querystring');
var util=require('util');

//http.ServerRequest提供了以下3个事件用于控制请求体传输
//data:当请求体数据到来时，该事件被触发。该事件提供一个参数chunk，表示接
//收到的数据。如果该事件没有被监听，那么请求体将会被抛弃。该事件可能会被调
//用多次。
// end:当请求体数据传输完成时，该事件被触发，此后将不会再有数据到来。
// close:用户当前请求结束时，该事件被触发。不同于end，如果用户强制终止了
// 传输，也还是调用close

http.createServer(function(req,res){
	var post='';
	req.on('data',function(chunk){
		post+=chunk;
	})
	req.on('end',function(){
		post=querystring.parse(post);
		res.end(util.inspect(post));
	})
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end(util.inspect(url.parse(req.url,true)));
}).listen(3000);