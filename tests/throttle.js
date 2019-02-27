import throttle from "../src/throttle";

var assert = require("assert");
describe("debounce", function () {
    it("execute after 1s", function (done) {
        let fn = throttle(function () {
            return Date.now();
        });
        let t  = Date.now();
        fn().then(function (val) {
            assert.equal(true,val-t>1000);
            done()
        });
    });
    it("execute multi times", function (done) {
        let fn = throttle(function () {
            return Date.now();
        });
        let t  = Date.now();
        fn().then(function (val) {
            console.log(val-t);
            assert.equal(true,val-t>1500);
        });
        fn().then(function (val) {
            console.log(val-t);
            assert.equal(true,val-t>1500);
            done()
        });
        setTimeout(fn,500)
    });
    it("execute immediately", function (done) {
        let fn = throttle(function () {
            return Date.now();
        },1000,true);
        let t  = Date.now();
        this.timeout(6000);
        let exeT;
        fn().then(function (val) {
            exeT=val;
            assert.equal(true,val-t<100);
        });
        fn().then(function (val) {
            assert.equal(true,val===exeT);
        });
        fn().then(function (val) {
            assert.equal(true,val===exeT);
        });
        fn().then(function (val) {
            assert.equal(true,val===exeT);
            done()
        });
    });
    it("clear", function (done) {
        let cnt = 0;
        let fn  = throttle(function () {
            cnt++;
            return cnt;
        }, 2000);
        let t   = Date.now();
        this.timeout(6000);
        let exeT;
        setTimeout(() => fn.clear(), 1500);
        setTimeout(() => {
            assert.equal(true, cnt === 0);
            done()
        }, 3000);
    });
});

