/**
 *
 * @param fn
 * @param {Number|Object} opt
 * @param mode
 * @returns {retFn}
 * @private
 */
function _throttle_(fn, opt = 1000, mode) {
    let delay, nextTask;
    if (typeof opt === "number") {
        opt = {delay: opt};
    }
    delay                          = opt.delay || 1000;
    let {immediate = true, leave,} = opt || {};
    let timer, t                   = 0, p, pres, prej, args;

    function _fn(ctx) {
        timer = undefined;
        if (nextTask) {
            pres(fn.apply(ctx, args));
            nextTask = undefined;
            pres     = prej = undefined;
        }
        p = undefined;
    }

    function _timer_(ctx) {
        let timestamp = Date.now();
        let timeout   = (timestamp - t - delay) > 0;
        t             = Date.now();
        // console.log("timeout", immediate && timeout);
        if (immediate && timeout) {
            pres(fn.apply(ctx, args));
        } else {
            if (!timeout && leave && mode !== 1) return;
            if (timer && mode === 1) {
                clearTimeout(timer);
                timer = undefined;
            }
            if (!leave) {
                nextTask = true;
            }
            if (!timer && (mode === 1 || nextTask)) {
                // console.log("delay", delay);
                timer = setTimeout(() => _fn(ctx), mode === 1 ? delay : (delay + t - timestamp));
            }
        }
    }

    function retFn() {
        args = arguments;
        !p ? p = new Promise((res, rej) => {
            pres = res;
            prej = rej;
            _timer_(this);
        }) : _timer_(this);
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
 * @param {object} [opt]
 * @returns {Function}
 */
export function throttle(fn, opt) {
    return _throttle_(fn, opt, 0)
}

/**
 *
 * @param fn
 * @param {object} [opt]
 * @returns {Function}
 */
export function debounce(fn, opt) {
    return _throttle_(fn, opt, 1);
}

// test
// let fn = (arg) => console.log("fn", arg);
// let t=throttle(fn, {delay:3000,leave:true});
// t(1);
// t(2);
// t(3);
// setTimeout(()=>t(4),3000);
// default {throttle, debounce}
// let ct = 1;
// setInterval(()=>console.log('ct',ct++),1000);
// let t  = debounce(fn, {delay: 3000, leave: true});
// t(1);
// setTimeout(() => t(2), 2000);
// setTimeout(() => t(3), 3000);
// setTimeout(() => t(4), 4000);