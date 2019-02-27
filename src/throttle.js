/**
 *
 * @param fn
 * @param delay
 * @param i
 * @returns {function(): Promise<any>}
 */
export default function (fn, delay = 1000, i) {
    let timer, t=0, p, pres;

    function _(ctx,args) {
        timer = undefined;
        p     = undefined;
        i && (t = Date.now());
        return fn.apply(ctx, args);
    }

    let retFn   = i ?
        function () {
            if (Date.now() - t > delay) {
                p = Promise.resolve(_(this, arguments));
            }
            return p;
        } : function () {
            timer&&clearTimeout(timer);
            let args = arguments;
            if (p) {
                timer = setTimeout(() => pres(_(this, args)), delay);
            } else {
                p = new Promise( (res)=>{
                    pres  = res;
                    timer = setTimeout(() => pres(_(this, args)), delay);
                });
            }
            return p;
        };
    retFn.clear = () => timer = clearTimeout(timer);
    return retFn;
}
