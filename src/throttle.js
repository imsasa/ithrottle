/**
 * @function throttle
 * @param fn {function} the function you want to limit execute
 * @param delay {number} delay time ,default 1000ms
 * @param immediateFlag {boolean} default false. if true, fn will execute  immediately;
 * @param leaveFlag {boolean};
 * @param promiseFlag {boolean}
 * @returns {throttle} default false. if true, fn will execute  immediately
 */
export default function throttle(fn, delay = 1000, immediateFlag = false, leaveFlag = false, promiseFlag = false) {
    let timer, args, p, pres, prej, t = 0;

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

    let retFn = immediateFlag ?
        function () {
            let flag = Date.now() - t < delay;
            if (leaveFlag && flag) return p;
            if (flag && !p) {
                p = promiseFlag ? Promise.resolve(fn.apply(ctx, arguments)) : fn.apply(ctx, arguments);
                t = Date.now();
            } else if (!timer) {
                args = arguments;
                promiseFlag ? p || (p = new Promise((res, rej) => _timer_(this, res, rej))) : _timer_(this);
            }
            return p;
        } : function () {
            if (timer && leaveFlag) return p;
            args = arguments;
            if (timer) return p;
            p = promiseFlag ? new Promise((res, rej) => _timer_(this, res, rej)) : _timer_(this);
            return p;
        };

    /**
     * 取消执行
     */
    retFn.clear = () => {
        clearTimeout(timer) || (timer = undefined);
        pres = p = undefined;
        t    = Date.now();
        if (prej) {
            prej('$rej$');
            prej = undefined;
        }
        return retFn;
    };
    return retFn;
}