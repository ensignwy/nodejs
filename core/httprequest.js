var http=require('http');
var querystring=require('querystring');

var contents=querystring.stringify({
	name:'peng',
	email:'peng@email.com',
	address:'HangZhou'
});

var options={
	host:'www.byvoid.com',
	path:'/application/node/post.php',
	method:'POST',
	headers:{
		'Content-Type':'application/x-www-form-urlencoded',
		'Conetnt-Length':contents.length
	}
};

var req=http.request(options,function(res){
	res.setEncoding('utf8');
	res.on('data',function(data){
		console.log(data);
	});
});

req.write(contents);
req.end();

