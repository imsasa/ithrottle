import {debounce} from "../src/index.js";
import assert from 'assert';
describe("debounce", function () {
    it("execute after 1s", function (done) {
        let fn = debounce(function () {
            return Date.now();
        }, 1200,{promise:true});
        let t  = Date.now();
        fn().then(function (val) {
            assert.equal(true, val - t >= 1200);
            done()
        });
    });
    it("execute multi times", function (done) {
        let fn = debounce(function () {
            return Date.now();
        },undefined,{promise:true});
        let t  = Date.now();
        fn().then(function (val) {
            assert.equal(true, val - t >= 1500);
        });
        fn().then(function (val) {
            assert.equal(true, val - t >= 1500);
        });
        setTimeout(function (){
            fn().then(function (val) {
                assert.equal(true, val - t >= 1500);
                done()
            });
        }, 500)
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
    it("execute immediately", function (done) {
        let fn = debounce(function () {
            return Date.now();
        }, 1000, {immediate:true,promise:true});
        let t  = Date.now();
        this.timeout(2000);
        let exeT;
        fn().then(function (val) {
            exeT = val;
            assert.equal(true, val - t < 30);
        });
        fn().then(function (val) {
            console.log("val - exeT",val - exeT);
            assert.equal(true, val - exeT > 1000);
            done()
        });
    });
    it("execute immediately without promise", function (done) {
        let t  = Date.now();
        let fn = debounce(function () {
            assert.equal(true, Date.now() - t < 30);
            done();
        }, 1000, {immediate:true});
        fn();
    });
    it("clear", function (done) {
        let cnt = 0;
        let fn2 = debounce(function () {
            cnt++;
            return cnt;
        }, 2000);
        this.timeout(6000);
        fn2();
        setTimeout(() => fn2.clear(), 600);
        setTimeout(() => {
            assert.equal(true, cnt === 0);
            done()
        }, 3000);
    });
    it("clear with promise", function (done) {
        let cnt = 0;
        let fn2 = debounce(function () {
            cnt++;
            return cnt;
        }, 2000,{promise:true});
        this.timeout(6000);
        fn2();
        setTimeout(() => fn2.clear(), 600);
        fn2().then(()=>{},function (val) {
            assert.equal(true, cnt === 0);
            assert.equal("$rej$", val);
        });
        setTimeout(() => {
            assert.equal(true, cnt === 0);
            done()
        }, 3000);
    });
});

