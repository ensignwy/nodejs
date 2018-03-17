var events=require('events');
var emitter=new events.EventEmitter();

//注册2个监听器
/**
 * @param  {[type]} event事件名称
 * @param  {[type]} listener监听器
 * @return {[type]}
 */
emitter.on('someEvent',function(arg1,arg2){
	console.log('listener1',arg1,arg2);
});

emitter.on('someEvent',function(arg1,arg2){
	console.log('listener2',arg1,arg2);
});

//发射事件，传递若干个可选参数到事件监听器的参数表
emitter.emit('someEvent','peng',1991);


