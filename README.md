# JS 节流和防抖实现 
**防抖**（./src/debounce.js），按固定频次执行操作（或理解为指定时间内只有一次操作有效）。执行某些前端操作时事件会被频繁触发，如：窗口放大缩小（`window.onresize`）、鼠标移动（`mousemove`）、上传进度（`upload.onprogress`）。频繁触发导致监听这些事件的函数会被频繁调用，但有时执行多次并没有什么意义，就像电影一秒只有24帧就够了，多了不过浪费胶片。

```javascript
/**
 * wrapFoo每隔50ms就会调用一次，但函数foo要间隔2S才执行一次
 * @example
 */

let foo=function(){
  console.log("foo");
  return "foo"
};
let wrapFoo=debounce(foo,2000);
setTimeout(wrapFoo,50);
/**
 * wrapFoo返回值类型为Promise 
 * 日志打印"foo"
 */

wrapFoo().then((res)=>console.log(res));

/**
 * 与wrapFoo不同的是，wrapFoo在调用2S后才执行，wrapFoo2在调用时立刻执行
 * @example
 */

let wrapFoo2=debounce(foo,2000,true);
```


**节流**（./src/throttle.js）,按字面意思，理解为：刻意限制或避免不必要的函数执行。防抖也属于节流的范畴。介绍另一种情况，指定时间间隔内多次调用函数仅最后一次有效。如，点击页面提交按钮，指定间隔时间内多次点击，仅最后一次操作生效。

```javascript
/**
 * wrapFoo每隔50ms就会调用一次，但函数foo要间隔2S才执行一次
 * @example
 */

let bar=function(){
  console.log("bar");
  return "bar"
};
let wrapBar=throttle(bar,2000);
wrapBar();//bar 2s后才执行；
setTimeout(wrapBar,1000); //1s后运行wrapBar，会导致前一次调用失效，函数重新计时，2s后执行；

let wrapBar2=throttle(bar,2000,true)
/**
*与wrapBar不同的是，wrapBar2在调用后立方执行，之后2s内的调用会延长（重新计时）下次执行的时间； 
*/


```


