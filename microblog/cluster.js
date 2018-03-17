/**
 * [cluster description]
 *     cluster.js的功能是创建与CPU核心个数相同的服务器进程，以确保充分利用多核CPU的
资源。主进程生成若干个工作进程，并监听工作进程结束事件，当工作进程结束时，重新启
动一个工作进程。分支进程产生时会自顶向下重新执行当前程序，并通过分支判断进入工作
进程分支，在其中读取模块并启动服务器。通过cluste二启动的工作进程可以直接实现端口
复用，因此所有工作进程只需监听同一端口。当主进程终止时，还要主动关闭所有工作进程。

终止工作进程，新的工作进程会立即启动，终止主进程，所有工作进程也会同时结束。
这样，一个既能利用多核资源，又有实现故障恢复功能的服务器就诞生了。

 * @type {[type]}
 */
var cluster=require('cluster')
var os=require('os');

//获取cpu数量
var numCPUs=os.cpus().length;

var workers={}
if(cluster.isMaster){
	//主进程分支
	cluster.on('death',function(worker){
		//当一个进程工作结束时，重启工作进程
		delete workers[orker.pid];
		worker=cluster.fork();
		workers[worker.pid]=worker;
	})
	//初始开启与CPU数量相同的工作进程
	for(var i=0;i<numCPUs;i++){
		//fork其实就是创建子进程的方法
		var worker=cluster.fork();
		workers[worker.pid]=worker;
	}
}else{
	//工作进程分支，启动服务器
	var app=require('./app');
	app.listen(3000);
}
//当主进程被终止时，关闭所有工作进程
process.on('SIGTERM',function(){
	for(var pid in workers){
		process.kill(pid);
	}
	process.exit(0);
})