/**
 *
 * @param fn
 * @param delay
 * @param i
 * @returns {function(): Promise<any>}
 */
export default function debounce(fn, delay = 1000, i) {
    let timer, args, p, t = 0;

    function _(ctx,args) {
        timer = undefined;
        i && (t = Date.now());
        return fn.apply(ctx, args)
    }

    function retFn() {
        args = arguments;
        if (i) {
            if (Date.now() - t > delay) {
                p = Promise.resolve(_(this, args));
            } else if (!timer) {
                timer = setTimeout(() => timer && (p = Promise.resolve(_(this, args))), delay);
            }
        }else if (!timer) {
            p = new Promise( (res) =>{
                timer = setTimeout(() => timer && res(_(this, args)), delay);
            });
        }
        return p;
    }

    /**
     * 取消执行
     */
    retFn.clear = () => timer = clearTimeout(timer)||(timer=undefined);
    return retFn;
}