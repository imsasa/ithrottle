import debounce from "../src/debounce";

var assert = require("assert");
describe("debounce", function () {
    it("execute after 1s", function (done) {
        let fn = debounce(() => Date.now());
        let t  = Date.now();
        fn().then(function (val) {
            assert.equal(true, val - t > 1000);
            done();
        });
    });
    it("call multi,execute one", function (done) {
        let exeCnt = 0;
        let fn     = debounce(function () {
            return ++exeCnt;
        });
        let cnt    = 0;
        let inter  = setInterval(function () {
            cnt++;
            if (cnt >= 5) {
                done();
                clearInterval(inter);
            }
            fn().then(function (val) {
                assert.equal(1, val);
            });
        }, 100)
    });
    it("execute Immediately", function (done) {
        let exeCnt = 0, cnt = 0;
        this.timeout(5000);
        let fn = debounce(function () {
            exeCnt++;
            return exeCnt;
        }, 3000, true);
        fn().then(() => assert.equal(1, exeCnt));
        let inter = setInterval(function () {
            cnt++;
            if (cnt >= 15) {
                clearInterval(inter);
                done();
            }
            fn().then(function (val) {
                assert.equal(1, val);
            });
        }, 100)
    });
    it("clear", function (done) {
        let exeCnt = 0;
        this.timeout(5000);
        let fn = debounce(function () {
            exeCnt++;
            return exeCnt;
        }, 3000);
        setTimeout(() => fn.clear(), 2000);
        setTimeout(() => {
            assert.equal(0, exeCnt);
            done()
        }, 4000);
    });
});

