function _throttle_(fn, delay, immediateFlag, leaveFlag, promiseFlag, mode) {
    let timer, t = 0, p, pres, prej, args;

    function _timer_(ctx, res, rej) {
        prej = rej;
        pres = res;
        if (mode) timer && clearTimeout(timer);
        timer = setTimeout(() => {
            if(!timer)return;
            promiseFlag ? pres(fn.apply(ctx, args)) : fn.apply(ctx, args);
            timer = undefined;
            pres  = prej = p = undefined;
            t     = Date.now();
        }, delay);
    }

    function retFn() {
        if (!timer && Date.now() - t > delay && immediateFlag) {
            t = Date.now();
            return promiseFlag ? Promise.resolve(fn.apply(this, args)) : fn.apply(this, args);
        }
        if (!timer || !leaveFlag) args = arguments;
        (!p && promiseFlag) ? p = new Promise((res, rej) => _timer_(this, res, rej))
            : _timer_(this, pres, prej);
        return p;
    }

    retFn.clear = () => {
        clearTimeout(timer) || (timer = undefined);
        pres = p = undefined;
        prej && prej("$rej$");
        prej = undefined;
        return retFn;
    };
    return retFn;
}

export function throttle(fn, delay = 1000, immediateFlag = false, leaveFlag = false, promiseFlag = false) {
    return _throttle_(fn, delay, immediateFlag, leaveFlag, promiseFlag, 0)
}

export function debounce(fn, delay = 1000, immediateFlag = false, leaveFlag = false, promiseFlag = false) {
    return _throttle_(fn, delay, immediateFlag, leaveFlag, promiseFlag, 1)
}
