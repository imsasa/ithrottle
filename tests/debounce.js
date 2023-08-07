import {debounce} from "../src/index.js";
import assert from 'assert';
describe("debounce", function () {
    it("execute", function (done) {
        let fn = debounce(function () {
            return Date.now();
        }, 1200);
        let t  = Date.now();
        fn().then(function (val) {
            assert.equal(true, val - t < 100);
            done()
        });
    });
    it("execute after 1s", function (done) {
        let fn = debounce(function () {
            return Date.now();
        }, {immediate:false,delay:1200});
        let t  = Date.now();
        fn().then(function (val) {
            assert.equal(true, val - t > 1200);
            done()
        });
    });
    it("execute multi times", function (done) {
        let fn = debounce(function () {
            return Date.now();
        },{immediate:false,delay:1500});
        let t  = Date.now();
        fn().then(function (val) {
            console.log('val',val - t);
            assert.equal(true, val - t >= 1500);
        });
        fn().then(function (val) {
            console.log('val',val - t);
            assert.equal(true, val - t >= 1500);
        });
        setTimeout(function (){
            fn().then(function (val) {
                console.log('val',val - t);
                assert.equal(true, val - t >= 1500);
                done()
            });
        }, 300);
    });

    it("execute multi times without promise", function (done) {
        let cnt=1;
        let t=Date.now();
        let fn = debounce(function () {
            assert.equal(true, Date.now() - t >= 1500);
            assert.equal(cnt,1);
            cnt++;
            done()
        },1000,false);
        fn();
        fn();
        setTimeout(function (){
            fn();
        }, 500)
    });
    it("clear", function (done) {
        let cnt = 0;
        let fn2 = debounce(function () {
            cnt++;
            return cnt;
        }, {delay:1200,immediate:false});
        this.timeout(6000);
        fn2();
        setTimeout(() => fn2.clear(), 600);
        setTimeout(() => {
            assert.equal(true, cnt === 0);
            done()
        }, 3000);
    });
});

