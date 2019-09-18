## what's this

这是一个简单的javascript 工具库，可以用来方便你控制函数执行的频率；

## how to use

```bash
npm i ithorttle;

```

### throttle-以固定的频率执行函数

使函数原本不定时、频繁地调用转成按固定频率执行。

```javascript
let throttle= require("ithrottle").throttle;
let foo     = function () {
    console.log("foo");
};
/**
 * 函数foo的调用间隔时间为2000ms
 */
let wrapFoo = throttle(foo, 2000);
// wrapFoo每200ms会被调用一次，函数foo实际每2S才执行一次
setInterval( ()=>wrapFoo(), 200);
```


### debounce-延迟执行函数

延迟执行函数，在指定的延迟时间内，再次调用函数会重新计算延迟时间。

```javascript
let debounce= require("ithrottle").debounce;
let bar=function(){
  console.log("bar");
  console.log(Date.now()-startTime)
};
/**
 * 函数bar延迟2000ms执行
 */
let wrapBar=debounce(bar,2000);
let startTime=Date.now();
wrapBar();
/**
 * 1000ms后调用，bar会再等待2000毫秒执行
 */
setTimeout(wrapBar,1000); 
```

## API

### throttle

- **arguments**
  
  -  {boolean} immediate=false ，为true则首次调用立即执行；
  - {boolean} leave=false  ，为true则忽略指定延迟时间内的调用；
  - {boolean} promise=false ，为true则执行后返回Promise。

- **return**
  - {function} clear， 取消执行。

### debounce

*与throttle相同*