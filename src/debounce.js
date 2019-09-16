/**
 * @function debounce
 * @param fn {function} the function you want to limit execute
 * @param delay {number} delay time ,default 1000ms
 * @param immediateFlag {boolean} default false. if true, fn will execute  immediately;
 * @param leaveFlag {boolean};
 * @param promiseFlag {boolean}
 * @returns {debounce} default false. if true, fn will execute  immediately
 */
export default function debounce(fn, delay = 1000, immediateFlag=false, leaveFlag=false,promiseFlag = false) {
    let timer, args, p,pres,prej, t = 0;

    function _(ctx, args) {
        timer = undefined;
        pres  = prej = p = undefined;
        return fn.apply(ctx, args)
    }

    function _timer_(res, ctx) {
        timer = setTimeout(() => {
            if (timer) {
                promiseFlag ? res(_(ctx, args)) : _(ctx, args);
            }
            t = Date.now();
        }, delay);
    }

    let retFn = immediateFlag ?
        function () {
            if (leaveFlag && timer) return p;
            args = arguments;
            if (Date.now() - t > delay && !p) {
                p = promiseFlag ? Promise.resolve(_(this, args)) : _(this, args);
                t = Date.now();
            } else if (!timer) {
                let ths = this;
                timer   = true;
                p       = promiseFlag ? new Promise((res, rej) => _timer_(res, ths)) : _timer_(res, ths);
            }
            return p;
        } : function () {
            if (timer) return p;
            args  = arguments;
            timer = true;
            promiseFlag ? p = new Promise((res) => {
                timer = setTimeout(() => timer && res(_(this, args)), delay);
            }) : setTimeout(() => timer && _(this, args), delay);
            return p;
        };

    /**
     * 取消执行
     */
    retFn.clear = () => {
        timer = clearTimeout(timer) || (timer = undefined);
        p     = undefined;
        prej && prej();
        return retFn;
    };
    // /**
    //  *
    //  * @param arg
    //  * @return {function(): Promise<any>}
    //  */
    // retFn.delay = (arg) => {
    //     delay = arg;
    //     return retFn;
    // };
    // /**
    //  *
    //  * @param arg
    //  * @return {function(): Promise<any>}
    //  */
    // retFn.promise = (arg) => {
    //     promiseFlag = !!arg;
    //     return retFn;
    // };
    return retFn;
}