/**
 * @function debounce
 * @param fn {function} the function you want to limit execute
 * @param delay {number} delay time ,default 1000ms
 * @param immediateFlag {boolean} default false. if true, fn will execute  immediately and ignore the call within delay time;
 * @param leaveFlag {boolean} default false. if true, fn will execute  immediately and ignore the call within delay time;
 * @param promiseFlag {boolean}
 * @returns {debounce}
 */
export default function debounce(fn, delay = 1000, immediateFlag = false, leaveFlag = false, promiseFlag = true) {
    let timer, t = 0, p, pres, prej, args;

    function _timer_(ctx, res, rej) {
        prej  = rej;
        pres  = res;
        timer = setTimeout(() => {
            if (!timer) return;
            timer = undefined;
            pres  = prej = p = undefined;
            promiseFlag ? res(fn.apply(ctx, args)) : fn.apply(ctx, args);
            t = Date.now();
        }, delay);
    }

    function retFn() {
        if (!timer && Date.now() - t > 0 && immediateFlag) {
            t = Date.now();
            p = promiseFlag ? Promise.resolve(fn.apply(ctx, args)) : fn.apply(ctx, args);
            return p;
        }
        if (!timer || !leaveFlag) args = arguments;
        !p && promiseFlag ? p = new Promise((res, rej) => _timer_(this, res, rej))
            : _timer_(this, pres, prej);
        return p;
    }

    retFn.clear = () => {
        timer = timer && clearTimeout(timer);
        p     = undefined;
        prej && prej();
        return retFn;
    };
    return retFn;
}
