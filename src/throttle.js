/**
 * @function throttle
 * @param fn {function} the function you want to limit execute
 * @param delay {number} delay time ,default 1000ms
 * @param immediateFlag {boolean} default false. if true, fn will execute  immediately and ignore the call within delay time;
 * @param promiseFlag {boolean}
 * @returns {throttle}
 */
export default function throttle(fn, delay = 1000, immediateFlag = false, promiseFlag = true) {
    let timer, t = 0, p, pres, prej;

    function _(ctx, args) {
        timer = undefined;
        pres  = prej = p = undefined;
        return fn.apply(ctx, args);
    }

    let retFn   = immediateFlag ?
        function () {
            if (Date.now() - t > delay) {
                t = Date.now();
                p = promiseFlag ? Promise.resolve(_(this, arguments)) : _(this, arguments);
            }
            return p;
        } : function () {
            let args = arguments;
            if (timer) {
                clearTimeout(timer);
                timer = setTimeout(() => promiseFlag ? pres(_(this, args)) : _(this, args), delay);
            } else {
                p = promiseFlag ? new Promise((res, rej) => {
                    pres  = res;
                    prej  = rej;
                    timer = setTimeout(() => res(_(this, args)), delay);
                }) : (timer = setTimeout(() => _(this, args), delay));
            }
            return p;
        };
    retFn.clear = () => {
        timer = timer && clearTimeout(timer);
        p     = undefined;
        prej && prej();
        return retFn;
    };
    // retFn.delay   = (arg) => {
    //     delay = arg;
    //     return retFn;
    // };
    // retFn.promise = (arg) => {
    //     promiseFlag = !!arg;
    //     return retFn;
    // };
    return retFn;
}
