## what's this

这是一个简单的javascript 工具库，可以用来方便你控制函数被调用的频率；

**防抖**（./src/debounce.js），按固定频次执行操作（或理解为指定时间内只有一次操作有效）。执行某些前端操作时事件会被频繁触发，如：窗口放大缩小（`window.onresize`）、鼠标移动（`mousemove`）、上传进度（`upload.onprogress`）。频繁触发导致监听这些事件的函数会被频繁调用，但有时执行多次并没有什么意义，就像电影一秒只有24帧就够了，多了不过浪费胶片。


**节流**（./src/throttle.js）,按字面意思，理解为：刻意限制或避免不必要的函数执行。防抖也属于节流的范畴。介绍另一种情况，指定时间间隔内多次调用函数仅最后一次有效。如，点击页面提交按钮，指定间隔时间内多次点击，仅最后一次操作生效。

## how to use

```javascript



/**
 * debounce
 * @example
 */

let foo=function(){
  console.log("foo");
};
//函数foo的调用间隔时间为2000ms
let wrapFoo=debounce(foo,2000);
// wrapFoo每200ms会被调用一次，函数foo实际每2S才执行一次
setInterval(wrapFoo,200);
/**
* 支持通过Promise获得执行结果
* @example
**/
setInterval(function (){
    wrapFoo().then((ret)=>console.log(ret))
},200);

```
```javascript

/**
 * 如果首次执行不需要等待，第三个参数指定为true
 * @example
 */
setInterval(debounce(foo,2000,true),200);

```

```javascript
/**
 * throttle
 * @example
 */

let bar=function(){
  console.log("bar");
};
/**
* 函数bar延迟2000ms执行
*/
let wrapBar=throttle(bar,2000);
wrapBar();
/**
* 2000ms内的调用会舍重新计算延长时间
* 1000ms后调用，bar会再等待2000毫秒执行
*/
setTimeout(wrapBar,1000); 
/**
* 支持通过Promise获得执行结果
* @example
**/
setTimeout(function (){
    wrapBar().then((ret)=>console.log(ret))
},1000);

```
```javascript

/**
* 函数调用后立即执行，之后2000ms内的调用丢弃
* @example
*/
let wrapBar2=throttle(bar,2000,true);
wrapBar2();
wrapBar2();//不会调用bar
```

```javascript
/**
 * 修改间隔时间
 * @example
 */
//默认间隔时间为1000ms;
let wrapfn=throttle(bar);
//将间隔时间修改为2000ms；
wrapfn.delay(2000);
```

```javascript
/**
 * @example
 * 取消执行等待中的函数
 */
let wrapfn=throttle(bar,1000);
wrapfn();//1000ms后执行
wrapfn.clear()//取消执行

```

## API
### throttle(fn, delay, i) ⇒ [<code>throttled</code>](#throttled)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | function | the function you want to limit execute |
| delay | number | delay time ,default 1000ms |
| i | boolean | default false. if true, fn will execute  immediately and ignore the call within delay time; |

<a name="throttled"></a>

### debounce(fn, delay, i) ⇒ [<code>throttled</code>](#throttled)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | function | the function you want to limit execute |
| delay | number | delay time ,default 1000ms |
| i | boolean | default false. if true, fn will execute  immediately; |

## Typedefs
### throttled 
**Returns**: Promise  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| clear |  function | not execute the function is waiting  |
| delay | function | set the interval time |
| promise | function | enable promise or not |