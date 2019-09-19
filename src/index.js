/**
 *
 * @param fn
 * @param delay
 * @param opt
 * @param mode
 * @returns {retFn}
 * @private
 */
function _throttle_(fn, delay = 1000, opt, mode) {
    if (typeof delay === "object") {
        opt   = delay;
        delay = opt.delay || 1000;
    }
    let {immediate, leave, promise} = opt || {};
    let timer, t                    = 0, p, pres, prej, args;

    function _timer_(ctx, res, rej) {
        if (!mode && timer) return;
        mode && timer && clearTimeout(timer);
        prej  = rej;
        pres  = res;
        timer = setTimeout(() => {
            if (!timer) return;
            promise ? pres(fn.apply(ctx, args)) : fn.apply(ctx, args);
            timer = undefined;
            pres  = prej = p = undefined;
            t     = Date.now();
        }, delay);
    }

    function retFn() {
        if (!timer || !leave) args = arguments;
        if (!timer && Date.now() - t > delay && immediate) {
            t = Date.now();
            return promise ? Promise.resolve(fn.apply(this, args)) : fn.apply(this, args);
        }
        (!p && promise) ? p = new Promise((res, rej) => _timer_(this, res, rej))
            : _timer_(this, pres, prej);
        return p;
    }

    retFn.clear = () => {
        clearTimeout(timer) || (timer = undefined);
        pres = p = undefined;
        prej && prej("$rej$");
        prej = undefined;
        t    = 0;
        return retFn;
    };
    return retFn;
}

/**
 *
 * @param fn
 * @param {number} [delay=1000]
 * @param {object} [opt]
 * @returns {Function}
 */
module.exports.throttle = function throttle(fn, delay, opt) {
    return _throttle_(fn, delay, opt, 0)
};

/**
 *
 * @param fn
 * @param {number} [delay=1000]
 * @param {object} [opt]
 * @returns {Function}
 */
module.exports.debounce = function (fn, delay, opt) {
    return _throttle_(fn, delay, opt, 1);
};
